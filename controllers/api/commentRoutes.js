const router = require("express").Router();
const { Comment } = require("../../models");
const auth = require("../../utils/auth");

// Get All Comments
router.get("/", auth, (req, res) => {
  if (req.session.logged_in) {
    Comment.findAll({
      attributes: ["id", "comment_text", "member_id", "post_id", "createdAt"],
      order: [["createdAt", "DESC"]],
    })
      .then((commentData) => res.json(commentData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// Create Comment
router.post("/", auth, (req, res) => {
  if (req.session.logged_in) {
    Comment.create({
      comment_text: req.body.comment_text,
      member_id: req.body.member_id,
      post_id: req.body.post_id,
    })
      .then((commentData) => res.json(commentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// Delete Comment
router.delete("/:id", auth, (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((commentData) => {
      if (!commentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
