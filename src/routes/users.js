const express = require('express');
const tweets = require('./tweets');
const { create } = require('../controllers/users');

// create a new router
const router = express.Router();

/*
  direct requests to /:handle/tweets to tweets router
  because this router is linked to /users in app.js
  then this actually handles requests to /users/:handle/tweets
*/
router.use('/:handle/tweets', tweets);

// direct POST requests to '/' ('/users/') to create function in users controller
router.post('/', create);

module.exports = router;