'use strict'

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      required: true
    },
    password: {
      type: DataTypes.STRING,
    },
    info: DataTypes.STRING,
    gold: DataTypes.INTEGER,
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true
  });
  return Users;
};