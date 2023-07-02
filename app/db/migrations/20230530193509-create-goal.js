'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Goals', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            user_id: {
                type: Sequelize.STRING,
            },
            title: {
                type: Sequelize.STRING,
            },
            subtitle: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            deadline: {
                type: Sequelize.DATE,
            },
            options: {
                type: Sequelize.JSON,
            },
            status: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Goals')
    },
}
