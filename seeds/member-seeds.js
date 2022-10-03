const { Member } = require("../models");

const memberData = [
  {
    username: "rorygilmore",
    password: "pass12345",
  },
  {
    username: "lorelaigilmore",
    password: "pass12345",
  },
  {
    username: "jessmariano",
    password: "pass12345",
  },
  {
    username: "deanforester",
    password: "pass12345",
  },
  {
    username: "lukedanes",
    password: "pass12345",
  },
];

const seedMembers = () => Member.bulkCreate(memberData);

module.exports = seedMembers;
