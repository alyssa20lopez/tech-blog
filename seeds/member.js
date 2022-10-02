const { Member } = require('../models');

const member_data =
[
  {
    "username": "rorygilmore",
    "email": "rorygilmore@gmail.com",
    "password": "password12345"
  },
  {
    "username": "lorelaigilmore",
    "email": "lorelaigilmore@hotmail.com",
    "password": "password12345"
  },
  {
    "username": "jessmariano",
    "email": "jessmariano@gmail.com",
    "password": "password12345"
  },
  {
    "username": "deanforester",
    "email": "deanforester@yahoo.com",
    "password": "password12345"
  },
  {
    "username": "lukedanes",
    "email": "lukedanes@gmail.com",
    "password": "password12345"
  }
]

const seedMembers = () => Member.bulkCreate(member_data);

module.exports = seedMembers;