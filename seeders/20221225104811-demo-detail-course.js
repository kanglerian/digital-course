'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('detailCourses', [
      {
        idCourse: 1,
        title: 'Pengenalan Coding',
        link: 'https://facebook.com',
        caption: 'Lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        idCourse: 1,
        title: 'Install IDE',
        link: 'https://facebook.com',
        caption: 'Lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        idCourse: 1,
        title: 'Pilih Bahasa Pemrograman',
        link: 'https://facebook.com',
        caption: 'Lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detailCourses', null, {});
  }
};
