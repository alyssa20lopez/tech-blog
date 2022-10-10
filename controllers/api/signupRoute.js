const route = require('express').Router();
const { Member } = require('../../models');

router.post('/', async (req, res) => {
  const findMember = await Member.findOne({ where: {member_name: req.body.member_name}});
  if(findMember) {
    res.status(400).json({ message: 'There is already a member with that username, please login or try again!'})
    return;
  }
  try {
    const member = await Member.create({
      member_name: req.body.member_name,
      email: req.body.email,
      password: req.body.password
    });
    req.session.save(() => {
      req.session.member_id = memberData.id;
      req.session.member_name = memberData.member_name;
      req.session.email = memberData.email;
      req.session.logged_in = true;
    });

      }catch (err) {
        res.status(500).json(err)
      }
});

module.exports = router;