const router = require("express").Router();
const { Post, Comment, Member } = require("../models");
const auth = require("../utils/auth");
const sequelize = require("../config/connection");

// Get Post
router.get("/", auth, (req, res) => {
  Post.findAll({
    where: {
      member_id: req.session.member_id,
    },
    attributes: ["id", "title", "content", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "member_id", "post_id", "createdAt"],
        include: {
          model: Member,
          attributes: ["member_name"],
        },
      },
      {
        model: Member,
        attributes: ["member_name"],
      },
    ],
  })
  .then((postData) => {
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

// Edit a Post
router.get("/edit/:id", auth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "createdAt"],
    include: [
      {
        model: Member,
        attributes: ["member_name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "member_id", "post_id", "createdAt"],
        include: {
          model: Member,
          attributes: ["member_name"],
        },
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = postData.get({ plain: true });
      res.render("edit-post", { post, logged_in: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new", (req, res) => {
  res.render("new-post");
});

module.exports = router;
