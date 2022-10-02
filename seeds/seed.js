const seedMembers = require('./member');
const seedPosts = require('./post');
const seedComments = require('./comment');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedMembers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedAll();