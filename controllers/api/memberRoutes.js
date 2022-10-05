const router = require('express').Router();
const { Member } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const members = await Member.findAll({
      include: [
        {
          model: Member,
          attributes: ['username'],
        },
      ],
    });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Member,
          attributes: ['username'],
        },
      ],
    });
    if (!member) {
      res.status(404).json('No user found with that ID');
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const memberData = await Member.create({
      username: req.body.username,
      password: req.body.password
    })
    req.session.save(() => {
      req.session.member_id = memberData.id;
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
        .json({ message: 'No member account found, please try again!' });
      return;
    }
    const validPassword = memberData.checkPassword(req.body.password);

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
      
      res.json({ member: memberData, message: 'You are now logged in!' });
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

router.put('/', async (req, res) => {
  try {
    const member = await Member.update(req.body, {
      where: {
        id: req.session.member_id,
      },
    });
    if (!member) {
      res.status(404).json('No member found with that ID');
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/member/:id', async (req, res) => {
  try {
    const memberData = await Member.destroy({
      where: {
        id: req.params.member_id,
      },
    });
    if (!memberData) {
      res.status(404).json({ message: 'No member found with this id!' });
    }
    req.session.destroy(() => {
      res.status(204).end().json('Member has been deleted successfully!');
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
