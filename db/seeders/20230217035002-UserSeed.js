'use strict';
const uuid = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: uuid.v4(),
        name: 'admin',
        email: 'admin@test.com',
        password: await bcrypt.hash('Test123@', await bcrypt.genSalt(10)),
        roles: ['ADMIN'],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
