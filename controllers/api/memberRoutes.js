const router = require('express').Router();
const { Member } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const memberData = await Member.findAll({
      include: [
        {
          model: Member,
        },
      ],
    });
    res.status(200).json(memberData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const memberData = await Member.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Member,
        }
      ],
    });
    if (!memberData) {
      res.status(404).json('No user found with that ID');
    }
    res.status(200).json(memberData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const memberData = await Member.create(req.body);

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
    const memberData = await Member.findOne({ where: { email: req.body.email } });

    if (!memberData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
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

module.exports = router;
