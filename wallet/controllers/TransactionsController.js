const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../models");
const Wallet = db.Wallet;
const Transaction = db.Transaction;
const pointHelper = require('../helpers/points_helper')
const { depositWithdrawSchema } = require('../helpers/validation_schema');
const market = require('../ApiModels/market');
const axios = require('axios');
const { get_fcm } = require('../ApiModels/student');



const storeGarageGateTransaction = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const result = await depositWithdrawSchema.validateAsync(req.body);
        const wallet = await Wallet.findOne({ where: { card_id: req.params.wallet_id } });
        if(!wallet) {
            res.status(404).json({success: false, message: "Not Found!"});
        } else {
            if(wallet.checkBalance(result.amount)) {
                
                const transaction = await Transaction.create({
                    wallet_id: wallet.card_id,
                    amount: result.amount,
                    initialized_at: new Date(),
                    accepted_at: new Date(),
                    type: "WITHDRAW",
                    other_id: result.other_id
                });
                await wallet.withdraw(transaction.amount, t);
                await pointHelper.updatePoints(wallet, transaction.amount, t);
                t.commit();

                res.json({ success:true, message: "student can enter" });    
            } else {
                t.rollback();
                res.status(422).json({
                    success: false,
                    message: "not enough balance"
                });
            }
        }
    } catch (error) {
        t.rollback();
        console.log(error);
        if(error.isJoi){
            res.status(422).json({
                success: false,
                error
            });
        }
        if(error.response){
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).send(error.message);
        }  
    }
}

const store = async (req, res) => {
    try {
        const result = await depositWithdrawSchema.validateAsync(req.body);
        const wallet = await Wallet.findOne({ where: { card_id: req.params.wallet_id } });
        if(!wallet)
            res.status(404).json({success: false, message: "Not Found!"});

        if(wallet.checkBalance(result.amount)) {
            
            await Transaction.create({
                wallet_id: wallet.card_id,
                amount: result.amount,
                initialized_at: new Date(),
                accepted_at: null,
                type: "WITHDRAW",
                other_id: result.other_id
            });

            //get user fcm code
            const response = await get_fcm(wallet.card_id);
            const fcm_token = response.data.student.fcm_code;
            //send notification to userusing fcm code
            const push_notification_url = `${process.env.API_GATEWAY_PROTOCOL}://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/notifications/notify_user/${fcm_token}/confirmPurchase_notification`;
            await axios.post(push_notification_url);
            res.json({ success:true, message: "transaction opened waiting student approval" });    
        } else {
            res.json({
                success: false,
                message: "not enough balance"
            });
        }
    } catch (error) {

        if(error.isJoi){
            res.status(422).json({
                success: false,
                error
            });
        }
        if(error.response){
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).send(error.message);
        }

        
    }
}

const show = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ where: {id: req.params.id} });
        res.json({ success:true, transaction });
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

const accept = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const wallet = await Wallet.findOne({ where: { card_id: req.body.wallet_id } });
        const transaction = await Transaction.findOne({ where: { id: req.params.id, accepted_at: null } });
        if(!wallet || !transaction) {
            res.status(404).json({success: false, message: "Not Found!"});
        } else {
            //await mohemaa because js is async
            if(wallet.checkBalance(transaction.amount)) {
                await wallet.withdraw(transaction.amount, t);
                await pointHelper.updatePoints(wallet, transaction.amount, t);
                //deposit to market
                await market.update_balance(transaction.other_id, transaction.amount);
                //add websocket in market to show balance update in realtime
                transaction.accepted_at = new Date();
                await transaction.save();
                t.commit();
                res.json({ success:true, message: "Thank you!" });
                //or send ok to client side
            } else {
                res.json({ success:false, message: "Not enough balance" });
            }
        }
    } catch(err){
        t.rollback();
        if(error.response){
            res.status(err.response.status).json(err.response.data);
        } else {
            res.status(500).send(error);
        }
    }
}

const reject = async (req, res) => {
    try {
        await Transaction.destroy({ where: { id: req.params.id, accepted_at: null } });
        //do nothing (realtime will not update market balance)
        //or send not ok to client side of market
        res.json({ success:true, message: "Transaction has been canclled!" });
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

const studentTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ 
            where: {
                wallet_id: req.params.student_id,
                accepted_at:{ [Op.ne]: null}
            },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success:true, transactions });
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

const otherTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ where: {
            other_id: req.params.other_id, 
            accepted_at:{ [Op.ne]: null },
            type: "WITHDRAW"
         }
        });
        res.json({ success:true, transactions });
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}


module.exports = {
    store,
    show,
    accept,
    reject,
    studentTransactions,
    otherTransactions,
    storeGarageGateTransaction
}