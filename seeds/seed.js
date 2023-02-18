const sequelize = require('../config/connection');
const { User, Comment, Blog } = require('../models');
const userData = require('./userData.json');
const commentData = require('./commentData.json');
const blogData = require('./blogData.json');

const seedAll = async () => {
  await sequelize.sync();

  await User.bulkCreate(userData);
  await Blog.bulkCreate(blogData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedAll();
