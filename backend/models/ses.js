'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SES extends Model {
    static associate(models) {
      // Une série peut avoir plusieurs accès
      SES.hasMany(models.ACCES, {
        foreignKey: 'SES_id',
        as: 'acces'
      });
      // Une série peut avoir plusieurs animations
      SES.hasMany(models.ANI, {
        foreignKey: 'SES_id',
        as: 'animations'
      });
      // Une série peut être accessible par plusieurs utilisateurs (through ACCES)
      SES.belongsToMany(models.USR, {
        through: models.ACCES,
        foreignKey: 'SES_id',
        otherKey: 'USR_id',
        as: 'utilisateurs'
      });
    }
  }
  SES.init({
    SES_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    SES_titre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    SES_theme: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    SES_description: {
      type: DataTypes.TEXT
    },
    SES_statut: {
      type: DataTypes.ENUM('actif', 'inactif', 'en_preparation'),
      allowNull: false,
      defaultValue: 'en_preparation'
    },
    SES_dateCreation: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'SES',
    tableName: 'SES'
  });
  return SES;
};