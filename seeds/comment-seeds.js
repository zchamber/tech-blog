const { Comment } = require('../models');

const commentData = [
  {
    "text": "Good Read",
    "comment_date": "Febuary 18 2020",
    "user_id": 3,
    "post_id": 2
  },
  {
    "text": "keep it up",
    "comment_date": "Febuary 3 2020",
    "user_id": 1,
    "post_id": 1
  },
  {
    "text": "Awesome Read",
    "comment_date": "Febuary 16 2020",
    "user_id": 2,
    "post_id": 1
  },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

