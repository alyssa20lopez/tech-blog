const router = require('express').Router();
const { Member } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const memberData = await Member.create({
      username: req.body.username,
      password: req.body.password
    })

    req.session.save(() => {
      req.session.member_id = memberData.id;
      req.session.username = memberData.username;
      req.session.logged_in = true;

      res.status(200).json(memberData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const memberData = await Member.findOne({ where: { username: req.body.username } });

    if (!memberData) {
      res
        .status(400)
        .json({ message: 'No user account found, please try again' });
      return;
    }

    const validPassword = await memberData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.member_id = memberData.id;
      req.session.username = memberData.username;
      req.session.logged_in = true;
      
      res.json({ user: memberData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/member/:id', async (req, res) => {
  try {
    const memberData = await Member.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!memberData) {
      res.status(404).json({ message: 'No member found with this id!' });
      return;
    }

    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
