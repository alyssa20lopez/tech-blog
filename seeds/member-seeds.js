const { Member } = require("../models");

const memberData = [
  {
    member_name: "rorygilmore",
    email: "gilmoregirl2@yahoo.com",
    password: "p@ss123456"
  },
  {
    member_name: "lorelaigilmore",
    email: "gilmoregirl_1@aol.com",
    password: "paZZ012345"
  },
  {
    member_name: "jessmariano",
    email: "profmariano5@yahoo.com",
    password: "passW0RD12345"
  },
  {
    member_name: "deanforester",
    email: "sk8terboy@gmail.com",  
    password: "passWoRd12345"
  },
  {
    member_name: "lukedanes",
    email: "iluvcoffee123@gmail.com",
    password: "password12345"
  },
];

const seedMembers = () => Member.bulkCreate(memberData);

module.exports = seedMembers;
