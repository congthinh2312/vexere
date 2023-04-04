'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Station, Ticket, PassengerCarCompanie}) {
      // define association here
      this.belongsTo(Station, {foreignKey: "fromStation", as: "from"});
      this.belongsTo(Station, {foreignKey: "toStation", as: "to"});
      this.hasMany(Ticket, {foreignKey: "trip_id"});
      this.hasMany(PassengerCarCompanie, {foreignKey: "trip_id"});
    }
  }
  Trip.init({
    startTime: DataTypes.DATE,
    price: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: true,
        len: [2, 20]
      },
    }
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};