const {Model, DataTypes} = require('sequelize');

import sequelize from "../config/database";

export class User extends Model {
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  }

}, {
  underscored: true,
  sequelize,
  modelName: 'users',
});
