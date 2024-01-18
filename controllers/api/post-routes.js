// Import necessary dependencies and modules
const router = require('express').Router();
const Post = require('../../models/Post');
const withAuth = require('../../utils/auth');

// Define a route for creating a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new post using the Post model and request body data
    const newData = await Post.create({
      post_title: req.body.post_title,
      post_contents: req.body.post_contents,
      user_id: req.session.userId
    });

    // Send a successful response with the newly created post data
    res.status(200).json(newData);
  } catch (err) {
    // Handle errors and send a response with the error details
    console.log(err);
    res.status(400).json(err);
  }
});

// Define a route for updating an existing post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the post with the specified ID using the Post model and request body data
    const updatePost = await Post.update(
      {
        post_title: req.body.post_title,
        post_contents: req.body.post_contents,
        user_id: req.session.userId
      },
      {
        where: {
          id: req.params.id,
        }
      }
    );

    // Check if the post was not found and send an appropriate response
    if (!updatePost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    // Send a successful response with the updated post data
    res.status(200).json(updatePost);
  } catch (err) {
    // Handle errors and send a response with the error details
    res.status(500).json(err);
  }
});

// Define a route for deleting an existing post by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete the post with the specified ID and user ID using the Post model
    const deleteData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.userId
      }
    });

    // Check if the post was not found and send an appropriate response
    if (!deleteData) {
      res.status(404).json({ message: "No post found with that ID" });
      return;
    }

    // Send a successful response with details of the deleted post
    res.status(200).json(deleteData);
  } catch (err) {
    // Handle errors and send a response with the error details
    res.status(500).json(err);
  }
});

// Export the router to use it in other parts of the application
module.exports = router;
