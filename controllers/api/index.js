const router = require('express').Router();

const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/post', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);


module.exports = router;