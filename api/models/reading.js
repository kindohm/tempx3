"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reading extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reading.init(
    {
      temperature: { type: DataTypes.FLOAT, allowNull: false },
      pressure: { type: DataTypes.FLOAT, allowNull: false },
      humidity: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Reading",
    }
  );
  return Reading;
};
