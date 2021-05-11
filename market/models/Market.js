'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Market extends Model {

    async deposit(balance, t) {
      this.balance = this.balance + balance;
      await this.save({transaction: t});
    }

    async withdraw(balance, t) {
      this.balance = this.balance - balance;
      await this.save({transaction: t});
    }

  }

  Market.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    balance: {
      type: DataTypes.FLOAT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Market'
  });
  return Market;
};