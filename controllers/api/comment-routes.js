// Import necessary modules and packages
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to create a new comment, using the withAuth middleware to ensure authentication
router.post('/', withAuth, async (req, res) => {
    try {
        // Attempt to create a new comment using data from the request body and the user's session ID
        const commentData = await Comment.create({
            text: req.body.text,
            comment_date: req.body.comment_date,
            user_id: req.session.userId,
            post_id: req.body.post_id
        });

        // Respond with a 200 status and the created comment data in JSON format
        res.status(200).json(commentData);
    } catch (err) {
        // If an error occurs, respond with a 400 status and the error in JSON format
        res.status(400).json(err);
    }
});

// Export the router for use in other parts of the application
module.exports = router;
