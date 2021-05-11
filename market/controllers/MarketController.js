const {sequelize, Market} = require("../models");

const {createMarketSchema, updateMarketSchema, withdrawAndDepositSchema} = require('../helpers/validation_schemas');
const {Op} = require("sequelize");


const index = async (req, res) => {
  try {

    const markets = await Market.findAll();
    res.json({
      success: true,
      markets
    });
  } catch (err) {
    res.status(500).json({
      "success": false,
      "error_message": err.message
    });
  }
}

const create = async (req, res, next) => {
  try {
    const result = await createMarketSchema.validateAsync(req.body);

    let market = await Market.findOne({
      where: {
        name: result.name
      }
    });

    if (!market) {
      market = await Market.create(result);
      res.json({
        success: true,
        market
      });
    } else {
      res.status(422).json({
        success: false,
        error_message: `${result.name} used before`
      });
    }

  } catch (err) {
    if (err.isJoi) {
      res.status(422).json({
        success: false,
        error_message: err.message
      });
    }
    next(err);
  }
}


const update_market = async (req, res, next) => {
  try {
    const result = await updateMarketSchema.validateAsync(req.body);

    const market = await Market.findOne({
      where: {
        id: req.params.id
      }
    });
    const otherMarketWithSameNewName = await Market.findOne({
      where: {
        [Op.and]: [
          {id: {[Op.not]: req.params.id}},
          {name: result.name}
        ]
      }
    });
    if (market && !otherMarketWithSameNewName) {
      market.name = result.name
      await market.save();
      res.json({
        success: true,
        message: "updated successfully",
        market
      });

    } else if (!market) {
      res.status(404).json({
        success: false,
        error_message: "not found"
      });
    } else if (otherMarketWithSameNewName) {
      res.status(422).json({
        success: false,
        error_message: `${result.name} is used before`
      });
    }
  } catch (err) {
    if (err.isJoi) {
      res.status(422).json({
        success: false,
        error_message: err.message
      });
    }
    next(err);
  }
}


const show_market = async (req, res) => {
  try {

    const market = await Market.findOne({
      where: {
        id: req.params.id
      }
    });

    if (market) {
      res.json({
        success: true,
        market
      });
    } else {
      res.status(404).json({
        success: false,
        error_message: "not found"
      })
    }

  } catch (err) {
    res.status(500).json({
      "success": false,
      "error_message": err.message
    })

  }

}


const withdraw = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const result = await withdrawAndDepositSchema.validateAsync(req.body);

    const market = await Market.findOne({
      where: {
        id: req.params.id
      }
    });

    if (market) {
      if(market.balance >= result.balance){
        await market.withdraw(result.balance, t);
        await t.commit();
        res.json({
          success: true,
          market
        });
      } else {
        res.status(422).json({
          success: false,
          error_message: "there is no enough balance"
        });
      }
    } else {
      res.status(404).json({
        success: false,
        error_message: "not found"
      });
    }
  } catch (err) {
    await t.rollback();
    if (err.isJoi) {
      res.status(422).json({
        success: false,
        error_message: err.message
      });
    }
    next(err);
  }
}


const deposit = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const result = await withdrawAndDepositSchema.validateAsync(req.body);

    const market = await Market.findOne({
      where: {
        id: req.params.id
      }
    });

    if (market) {
      await market.deposit(result.balance, t);
      await t.commit();
      res.json({
        success: true,
        market
      });
    } else {
      res.status(404).json({
        success: false,
        error_message: "not found"
      })
    }
  } catch (err) {
    await t.rollback();
    if (err.isJoi) {
      res.status(422).json({
        success: false,
        error_message: err.message
      });
    }
    next(err)
  }
}


const delete_market = async (req, res, next) => {
  try {
    const market = await Market.findOne({
      where: {
        id: req.params.id
      }
    });

    console.log(market);

    if (market) {
      await market.destroy();
      res.json({
        success: true,
        message: "deleted successfully"
      });
    } else {
      res.status(404).json({
        success: false,
        error_message: "not found"
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  create,
  delete_market,
  update_market,
  show_market,
  withdraw,
  deposit
}