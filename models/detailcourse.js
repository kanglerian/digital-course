'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detailCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      detailCourse.belongsTo(models.Course, {as: 'Detail', foreignKey: 'idCourse'});
    }
  }
  detailCourse.init({
    idCourse: DataTypes.INTEGER,
    title: DataTypes.STRING,
    link: DataTypes.TEXT,
    caption: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'detailCourse',
  });
  return detailCourse;
};