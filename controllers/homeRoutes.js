const router = require('express').Router();
const { Post, Comment, Member } = require('../models');

router.get("/", (req, res) => {
    Post.findAll({
      attributes: ['id', 'title', 'content','createdAt'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
          include: {
            model: Member,
            attributes: ['username']
          }
        },
        {
          model: Member,
          attributes: ["username"]
        }
      ]
    })
      .then(postData => {
          const posts = postData.map(post => post.get ({ plain: true}));
          res.render('homepage', {
             posts, 
             loggedIn: req.session.loggedIn,
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'content', 'createdAt'],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        include: {
          model: Member,
          attributes: ['username']
        }
      }
    ]
  })
    .then(postData => {
      if(!postData){
        res.status(404).json({ message: 'No post found with this id'});
        return;
      }
      const post = postData.get({ plain: true });
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
