// Import necessary dependencies and modules
const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Route for rendering the home page with all posts
router.get('/', async (req, res) => {
  try {
    // Fetch all posts with associated user information
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Map the post data for rendering
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the home page with posts and login status
    res.render('home', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Handle errors and send a response with the error details
    res.status(500).json(err);
  }
});

// Route for rendering a specific post and its comments
router.get('/post/:id', withAuth, async (req, res) => {
  // Check if the parameter is a valid ID
  if (!/^[0-9]+$/.test(req.params.id)) {
    res.status(400).json("Error: Improper URL");
    return;
  }

  try {
    // Fetch a specific post by ID with associated user and comment information
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    // Convert post data to plain object for rendering
    const post = postData.get({ plain: true });

    // Render the post page with post, comments, and login status
    res.render('post', {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Handle errors and send a response with the error details
    res.status(500).json(err);
  }
});

// Route for rendering the dashboard with user's posts
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch the user's posts for rendering the dashboard
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    // Map the post data for rendering
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard with user's posts and login status
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Handle errors and send a response with the error details
    res.status(500).json(err);
  }
});

// Route for rendering the edit page for a specific post
router.get('/edit/:id', async (req, res) => {
  // Check if the parameter is a valid ID
  if (!/^[0-9]+$/.test(req.params.id)) {
    res.status(400).json("Error: Improper URL");
    return;
  }

  try {
    // Fetch a specific post by ID with associated user information
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });

    // Convert post data to plain object for rendering
    const post = postData.get({ plain: true });

    // Render the edit page with post details and login status
    res.render('edit', {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Handle errors and send a response with the error details
    res.status(500).json(err);
  }
});

// Route for rendering the new post page
router.get('/dashboard/newPosts', withAuth, (req, res) => {
  try {
    // Render the new post page with an indicator for a new post
    res.render('newpost', {
      existingPost: false,
    });
  } catch (err) {
    // Handle errors and send a response with the error details
    res.status(500).json(err);
  }
});

// Route for rendering the login page
router.get('/login', async (req, res) => {
  res.render('login');
});

// Route for rendering the signup page
router.get('/sign-up', async (req, res) => {
  res.render('signup');
});

// Export the router to use it in other parts of the application
module.exports = router;
