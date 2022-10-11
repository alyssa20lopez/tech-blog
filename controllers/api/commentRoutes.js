const router = require("express").Router();
const { Comment } = require("../../models");
const auth = require("../../utils/auth");

// Get All Comments
router.get("/", (req, res) => {
    Comment.findAll({})
      .then((commentData) => res.json(commentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    })
});

router.get("/:id", (req, res) => {
    Comment.findAll({
        where: {
          id: req.params.id
        }
    })
      .then((commentData) => res.json(commentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    })
});

// Create Comment
router.post("/", auth, (req, res) => {
  if (req.session) {
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

router.put("/:id", auth, (req, res) => {
    Comment.update({
      comment_text: req.body.comment_text,
    },
    {
      where: {
        id: req.params.id
      }
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
