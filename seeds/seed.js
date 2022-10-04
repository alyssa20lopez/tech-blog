const seedMembers = require('./member-seed');
const seedPosts = require('./post-seed');
const seedComments = require('./comment-seed');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedMembers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedAll();