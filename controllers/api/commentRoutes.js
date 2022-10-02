const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../../utils/auth')

router.post('/', auth, (req, res) => {
  Comment.create({ ...req.body, memberId: req.session.memberId })
      .then(newComment => {
        res.json(newComment);
      })
      .catch(err => {
        res.status(500).json(err);
      })
});

module.exports = router;
