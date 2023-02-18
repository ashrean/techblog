const User = require('./User')
const Blog = require('./Blog')
const Comment = require('./Comment')

Blog.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
})

Blog.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
})

Comment.belongsTo(User, {
    foreignKey: 'userId',
})

Comment.belongsTo(Blog,{
    foreignKey: 'postId'
})

User.hasMany(Post,{
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

User.hasMany(Comment,{
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})


module.exports = {User, Blog, Comment};
