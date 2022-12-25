'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class myCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      myCourse.belongsTo(models.Course, {as: 'Course', foreignKey: 'idCourse'});
    }
  }
  myCourse.init({
    idUser: DataTypes.INTEGER,
    idCourse: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'myCourse',
  });
  return myCourse;
};