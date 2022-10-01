const router = require('express').Router();
const { Blog } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const newBlog = await Blog.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(500).json(newBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const newBlog = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    if (!newBlog) {
      res.status(404).json('No blog found with that ID');
    }
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      member_id: req.session.member_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        member_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
