const router = require('express').Router();
const { Post, Comment, Member } = require('../models');

// Get Post
router.get('/', async (req, res) => {
  try {
    if(!req.session.logged_in){
      res.redirect('/login');
      return;
    }
    const dashboardDb = await Post.findAll(
      {
        attributes: ['id','member_id','title','content'],
        where: {
          member_id: req.session.member_id
        }
      }
    )
    const memberPosts = dashboardDb.map(post => post.get({}))
   
    res.render('dashboard', {
      memberPosts,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
});

// Edit a Post
router.get('/singlepost/:id', async (req, res) => {
  try {
    const postDb = await Post.findByPk(req.params.id, {
      attributes: ['id','title','content'],
    })
    const postData = postDb.get({ plain: true })
    console.log(postData);
    
    res.render('singlepost', {
      postData,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

// Post to Dashboard
router.post('/', async (req, res) => {

  const member_id = req.session.member_id;
  const {title, content} =req.body;

  try {
    const newPost = await Post.create({
      title,
      content,
      member_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Post
router.put('/singlepost/id:', async (req, res) => {
  const {title, content} = req.body;
  console.log (title, content)
  try {
    const updatePost = await Post.update(
      {
        title,
        content
      },
      {
        where: {
          id: req.params.id
        }
      }
    )  
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Post
router.delete('/:id', async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;