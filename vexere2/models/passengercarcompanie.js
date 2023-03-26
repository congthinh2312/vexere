'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PassengerCarCompanie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Vehicle, Trip}) {
      // define association here
      this.hasMany(Vehicle, {foreignKey: "passengerCarCompanie_id"});
      this.belongsTo(Trip, {foreignKey: "trip_id"});
    }
  }
  PassengerCarCompanie.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'PassengerCarCompanie',
  });
  return PassengerCarCompanie;
};