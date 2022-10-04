const { Member } = require("../models");

const memberData = [
  {
    username: "rorygilmore",
    password: "p@ss123456",
  },
  {
    username: "lorelaigilmore",
    password: "paZZ0123123",
  },
  {
    username: "jessmariano",
    password: "p@ssW0RD123456",
  },
  {
    username: "deanforester",
    password: "passWoRd012345",
  },
  {
    username: "lukedanes",
    password: "Pass12345678",
  },
];

const seedMembers = () => Member.bulkCreate(memberData);

module.exports = seedMembers;
