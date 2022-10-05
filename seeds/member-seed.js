const { Member } = require("../models");

const memberData = [
  {
    username: "rorygilmore",
    password: "p@ss123456",
  },
  {
    username: "lorelaigilmore",
    password: "paZZ012345",
  },
  {
    username: "jessmariano",
    password: "passW0RD12345",
  },
  {
    username: "deanforester",
    password: "passWoRd12345",
  },
  {
    username: "lukedanes",
    password: "pass12345",
  },
];

const seedMembers = () => Member.bulkCreate(memberData);

module.exports = seedMembers;
