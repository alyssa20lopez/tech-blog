const router = require('express').Router();
const { Post, Comment, Member } = require('../../models');


// Add Post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Post
router.put('/onepost/id:', async (req, res) => {
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