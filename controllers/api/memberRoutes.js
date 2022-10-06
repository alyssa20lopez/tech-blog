const router = require('express').Router();
const { Member, Post, Comment } = require('../../models');

// Get ALL Members
router.get('/', (req, res) => {
  Member.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(memberData => res.json(memberData))
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get Member by Id
router.get('/:id', async (req, res) => {
  Member.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'createdAt']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'createdAt'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
  .then(memberData => {
    if (!memberData) {
      res.status(404).json('No user found with that ID');
      return;
    }
    res.json(memberData);
  })
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Post
router.post('/', (req, res) => {
  Member.create({
      member_name: req.body.member_name,
      email: req.body.email,
      password: req.body.password
    })
    .then(memberData => {
    req.session.save(() => {
      req.session.member_id = memberData.id;
      req.session.member_name = memberData.member_name;
      req.session.logged_in = true;

      res.json(memberData);
    });
  })
});

router.post('/login', (req, res) => {
  Member.findByPk({
    where: {
      member_name: req.body.member_name
    }
  })
  .then(memberData => {
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
      req.session.member_name = memberData.member_name;
      req.session.logged_in = true;
      
      res.json({ member: memberData, message: 'You are now logged in!' });
    });
  })
});

// Logout
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
