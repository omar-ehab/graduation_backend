const { labAccess } = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');
const { recordLabEtranceSchema } = require('../helpers/validation_schema');

const store_access = async (req, res) => {
    try {
        const results = await recordLabEtranceSchema.validateAsync(req.body);

        const data = {
            student_id: results.student_id,
            lab_name: results.lab_name,
            entered_at: new Date()
        }
        const lab_access = await labAccess.create(data);
        return res.json({success: true, lab_access});
        
    } catch(error){
        if(error.isJoi){
            res.status(422).json({success: false, error})
        }
        return res.status(500).json(error)
    }
}

const get_distincet_labs = async (req, res, next) => {
    try{
        const data = await labAccess.aggregate('lab_name', 'DISTINCT', { plain: false});
        const labs = [];
        data.forEach((element, index) => {
            labs.push({
                id: index + 1,
                name: element.DISTINCT
            });
        });
        res.json({success: true, labs});
    } catch(err) {
        console.log(err);
        next(err);
    }
}

const get_excel_data = async (req, res, next) => {
    const lab_name = req.params.lab_name;
    try{
        //this code is for getting data from database
        const data = await labAccess.findAll({ where: generate_condition_object(lab_name, req.body) });
        const records = data.map((rec, index) => {
            return {
                id: index + 1,
                student_id: rec.student_id,
                lab: rec.lab_name,
                date: rec.entered_at.toLocaleString(),
            }
        });

        res.json({ success: true, records});
    } catch(error) {
        console.log(error)
        next(error)
    }   
}

const generate_condition_object = (lab_name, data) => {
    let obj = {lab_name};

    if(data.from !== undefined && data.to !== undefined) {
        obj.entered_at = {
            [Op.gte]: moment.utc(data.from, "YYYY-MM-DD"),
            [Op.lte]: moment.utc(data.to, "YYYY-MM-DD").add(24, 'hours').subtract(1, 'minute').toDate()
        }
    } else if(data.from !== undefined && data.to === undefined) {
        obj.entered_at = {
            [Op.gte]: moment.utc(data.from, "YYYY-MM-DD"),
        }
    } else if(data.from === undefined && data.to !== undefined) {
        obj.entered_at = {
            [Op.lte]: moment.utc(data.to, "YYYY-MM-DD").add(24, 'hours').subtract(1, 'minute').toDate()
        }
    }
    return obj;
}

module.exports = {
    store_access,
    get_distincet_labs,
    get_excel_data
}