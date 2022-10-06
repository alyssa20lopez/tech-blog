const Member = require('./Member');
const Post = require('./Post');
const Comment = require('./Comment');

Member.hasMany(Post, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(Member, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Member, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Member.hasMany(Comment, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});


module.exports = {Member, Post, Comment};