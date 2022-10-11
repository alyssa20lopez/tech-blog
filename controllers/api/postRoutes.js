const router = require('express').Router();
const { Post, Comment, Member } = require('../../models');
const auth = require('../../utils/auth');

// Get All Posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'createdAt'],
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'member_id', 'post_id', 'createdAt'],
        include: {
          model: Member,
          attributes: ['member_name']
        }
      },
      {
        model: Member,
        attributes: ['member_name']
      }
    ]
  })
  .then(postData => res.json(postData.reverse()))
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get Single Post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'content', 'createdAt'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'member_id', 'post_id', 'createdAt'],
        include: {
          model: Member,
          attributes: ['member_name']
        }
      },
      {
        model: Member,
        attributes: ['member_name']
      }
    ]
  })
  .then(postData => {
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id'});
      return;
    }
    res.json(postData);
  })
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create Post
router.post('/', auth, (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    member_id: req.session.member_id
  })
  .then(postData => res.json(postData))
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Update Post
router.put('/:id', auth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }
  )  
  .then(postData => {
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id'});
      return;
    }
    res.json(postData);
  })
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete Post
router.delete('/:id', auth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then(postData => {
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id'});
      return;
    }
    res.json(postData);
  })
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;