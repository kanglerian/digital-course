'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Courses', [
      {
        nameCourse: '5 Days of Advanced Website Making',
        price: 50000,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        nameCourse: 'Good at Advertising FB Ads',
        price: 35000,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        nameCourse: 'Become a Back End Developer',
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
