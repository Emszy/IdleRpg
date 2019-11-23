'use strict'

module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('inventory', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name : DataTypes.STRING,
    item_id : DataTypes.INTEGER,
    item_index: DataTypes.INTEGER,
    subCategory_id : DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    quantity : DataTypes.INTEGER,
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true
  });
  return Inventory;
};