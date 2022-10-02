const router = require('express').Router();
const { Post, Comment, Member } = require('../models');

router.get('/', async (req, res) => {
  try {
    const homepageData = await Post.findAll(
      {
        attributes: ['id', 'title', 'createdAt'], 
        include: {
          model: Member,
          attributes: ['username']
        }
      }
     ).catch((err) => {
      res.json(err);
     })
      
    const posts = homepageData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/singlepost/:id', async (req, res) => {
  try {
    if(!req.session.logged_in){
      res.redirect('/login');
      return;
    }
    const postDb = await Post.findByPk(req.params.id, {
      attributes: ['id','title','content','createdAt'],
      include: {
        model: Member,
        attributes: ['username']
      },
    })
    const commentDb = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      attributes: ['id','content','createdAt'],
      include: {
        model: Member,
        attributes: ['username']
      },
    })

    const postData = await postDb.get({ plain: true });
    const commentData = await commentDb.map(comment => comment.get({plain: true})) 
    postData.comments = commentData

    res.render('post', {
      postData,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
