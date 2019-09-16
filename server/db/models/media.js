const Sequelize = require('sequelize')
const db = require('../db')

const Media = db.define('media', {
    path: {
        type: Sequelize.TEXT,
        validate: {
            notEmpty: true,
            isUrl: true
        }
    },
    xCoord: {
        type: Sequelize.FLOAT,
        defaultValue: 50
    },
    yCoord: {
        type: Sequelize.FLOAT,
        defaultValue: 50
    },
    rotation: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    width: {
        type: Sequelize.FLOAT,
        defaultValue: .1
    },
    height: {
        type: Sequelize.FLOAT,
        defaultValue: .1
    },
    filter: {
        type: Sequelize.STRING
    },
    scrapbookId: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    pageId: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

module.exports = Media
