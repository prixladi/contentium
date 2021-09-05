module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      keyworkText: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      brief: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      author: {
        type: Sequelize.STRING,
        allowNull: true
      },
      readingTimeInMinutes: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });

    await queryInterface.createTable('settings', {
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('articles');
    await queryInterface.dropTable('settings');
  },
};
