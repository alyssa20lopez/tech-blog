const { Member } = require("../models");

const memberData = [
  {
    username: "rorygilmore",
    email: "gilmoregirl2@yahoo.com",
    password: "p@ss123456"
  },
  {
    username: "lorelaigilmore",
    email: "gilmoregirl_1@aol.com",
    password: "paZZ012345"
  },
  {
    username: "jessmariano",
    email: "profmariano5@yahoo.com",
    password: "passW0RD12345"
  },
  {
    username: "deanforester",
    email: "sk8terboy@gmail.com",  
    password: "passWoRd12345"
  },
  {
    username: "lukedanes",
    email: "iluvcoffee123@gmail.com",
    password: "password12345"
  },
];

const seedMembers = () => Member.bulkCreate(memberData);

module.exports = seedMembers;
