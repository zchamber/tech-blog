// Import necessary dependencies and modules
const router = require('express').Router();
const { User } = require('../../models');

// Route for creating a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user using the User model and request body data
    const newUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Save user data to session for authentication
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = newUserData.username;
      req.session.user_id = newUserData.user_id;
    });

    // Send a successful response with the newly created user data
    res.status(200).json({
      user: newUserData
    });
  } catch (err) {
    // Handle errors and send a response with the error details
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    // Find user data based on the provided email
    const userData = await User.findOne({ 
      where: { email: req.body.email } 
    });

    // Check if user data was found
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save user data to session for authentication
    req.session.save(async () => {
      req.session.userId = await userData.id;
      req.session.userdata = await userData;
      req.session.loggedIn = true;
      
      // Send a successful response with user data and login message
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // Handle errors and send a response with the error details
    res.status(400).json(err);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the session for user logout
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, send a 404 response
    res.status(404).end();
  }
});

// Export the router to use it in other parts of the application
module.exports = router;
