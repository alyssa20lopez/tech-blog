const router = require('express').Router();
const memberRoutes = require('./memberRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/members', memberRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;