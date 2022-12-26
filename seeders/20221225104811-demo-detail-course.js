'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('detailCourses', [
      {
        idCourse: 1,
        title: 'Pengenalan Coding',
        link: '12TuC1sUXxM',
        caption: 'Lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        idCourse: 1,
        title: 'Install IDE',
        link: 'M1l3ir5tsPs',
        caption: 'Lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        idCourse: 1,
        title: 'Pilih Bahasa Pemrograman',
        link: 'rpMcUzQnvDs',
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
