const seedMembers = require('./member-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedMembers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedAll();