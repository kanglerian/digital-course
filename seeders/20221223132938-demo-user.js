'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      fullName: 'Lerian Febriana',
      email: 'kanglerian@github.com',
      password: 'lerian123',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    fullName: 'Sopyan Sauri',
    email: 'sopyansauri@github.com',
    password: 'sopyan123',
    status: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};