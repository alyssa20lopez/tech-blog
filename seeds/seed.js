const sequelize = require('../config/connection');
const { Member, Blog } = require('../models');

const memberData = require('./userData.json');
const blogData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const members = await Member.bulkCreate(memberData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      member_id: members[Math.floor(Math.random() * members.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
