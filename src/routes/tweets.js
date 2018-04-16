const express = require('express');
const { index } = require('../controllers/tweets');

/*
  create a new router
  in this case, we are setting mergeParams: true
  this means that if the router is nested, we also have access params from the parent router
  this router is nested under the users router
*/
const router = express.Router({ mergeParams: true });

// GET requests to / are directed to the index function on the tweets controller
router.get('/', index);

// POST requests to / are directed to the create function on the tweets controller
router.post('/', create);

module.exports = router;