'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.hasMany(models.myCourse, {as: 'Course', foreignKey: 'idCourse'});
    }
  }
  Course.init({
    nameCourse: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};