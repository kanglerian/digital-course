'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Courses', [
      {
        nameCourse: '5 Hari Jago Bikin Website',
        price: 50000,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        nameCourse: 'Jago Ngiklan FB Ads',
        price: 35000,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        nameCourse: 'Jadi BackEnd Developer',
        price: 40000,
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
