const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
       title: DataTypes.STRING,
       body: DataTypes.STRING,
    },
    {
        sequelize,
    }
);

module.exports = Blog;
