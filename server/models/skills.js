'use strict'
module.exports = (sequelize, DataTypes) => {
  const Skills = sequelize.define('skills', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    skill_id: DataTypes.INTEGER,
    skill: DataTypes.STRING,
    value: DataTypes.INTEGER,
    current : DataTypes.INTEGER,
    name: DataTypes.STRING,
    boost : DataTypes.INTEGER,
    xp : DataTypes.INTEGER,
    threshold : DataTypes.INTEGER,
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true
  });
  return Skills;
};