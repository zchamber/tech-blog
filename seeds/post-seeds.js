const { Post } = require('../models');

const postData = [
  {
    "post_title": "The Benefits of Meditation",
    "post_contents":"AWESOME CONTENT",
    "user_id": 2,
  },
  {
    "post_title": "The Benefits of Meditation 2",
    "post_contents":"AWESOME CONTENT 2",
    "user_id": 1,
  },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

