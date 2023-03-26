'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Seat, PassengerCarCompanie}) {
      // define association here
      this.hasMany(Seat, {foreignKey: "vehicled_id"});
      this.belongsTo(PassengerCarCompanie, {foreignKey: "passengerCarCompanie_id"});
    }
  }
  Vehicle.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};