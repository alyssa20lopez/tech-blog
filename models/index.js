const Member = require('./Member');
const Blog = require('./Blog');

Member.hasMany(Blog, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(Member, {
  foreignKey: 'member_id'
});

module.exports = { Member, Blog};