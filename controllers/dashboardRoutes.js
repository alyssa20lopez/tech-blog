const router = require('express').Router();
const { Post, Comment, Member } = require('../models');
const auth = require('../utils/auth');

// Get Post
router.get('/', auth, (req, res) => {
    Post.findAll({
        where: {
          member_id: req.session.member_id
        },
        attributes: ['id', 'title', 'content', 'createdAt'],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'user_id', 'post_id', 'createdAt'],
            include: {
              model: Member,
              attributes: ['username']
            }
          },
          {
            model: Member,
            attributes: ['username']
          }
        ]
    })
    .then(postData => {
      const post = postData.map(post => post.get({ plain: true }));
      res.render('dashboard', { post, logged_in: true });
    })
    .catch (err => {
      console.log(err)
      res.status(500).json(err)
    });
});

// Edit a Post
router.get('/edit-post/:id', auth, (req, res) => {
  Post.findByPk({
    where: {
      id: req.params.id
    },
    attributes: ['id','title','content', 'createdAt'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'createdAt'],
        include: {
          model: Member,
          attributes: ['username']
        }
      },
      {
        model: Member,
        attributes: ['username']
      }
    ]
  })
  .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id'});
        return;
      }
      const post = postData.get({ plain: true });

      res.render('edit-post', { post, logged_in: true });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  });
});

module.exports = router;