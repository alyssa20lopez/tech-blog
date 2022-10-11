const router = require('express').Router();
const memberRoutes = require('./memberRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/members', memberRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;