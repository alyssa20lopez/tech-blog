const Member = require('./Member');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(Member, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Member, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

module.exports = {Member, Post, Comment};