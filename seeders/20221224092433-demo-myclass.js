'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('myCourses', [
      {
        idUser: 1,
        idCourse: 1,
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        idUser: 1,
        idCourse: 3,
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        idUser: 2,
        idCourse: 2,
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('myCourses', null, {});

  }
};
