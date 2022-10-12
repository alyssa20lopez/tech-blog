const router = require("express").Router();
const { Post, Comment, Member } = require("../models");
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "member_id", "createdAt"],
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
      res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
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
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = postData.get({ plain: true });
      res.render("single-post", {
        post,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/post-comments", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
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
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = postData.get({ plain: true });
      res.render("post-comments", {
        post,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
