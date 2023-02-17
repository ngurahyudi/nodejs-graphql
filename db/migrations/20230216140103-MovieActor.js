'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('movie_actor', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      movieId: {
        type: Sequelize.UUID,
        field: 'movie_id',
        allowNull: false,
        references: {
          model: 'movies',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      actorId: {
        type: Sequelize.UUID,
        field: 'actor_id',
        allowNull: false,
        references: {
          model: 'actors',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('movie_actor');
  },
};
