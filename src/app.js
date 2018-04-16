const express = require('express');
const users = require('./routes/users');
const tweets = require('./routes/tweets');

// create a new server object
const app = express();

/* custom middleware
allow CORS (cross-origin-resource-sharing)
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
*/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse json requests payloads and add them to req.body
app.use(express.json());

// direct requests to /users to our users router
app.use('/users', users);

// direct requests to /tweets to our tweets router
app.use('/tweets', tweets)

console.log('App listening on localhost:3000');
// start the server on port 3000
app.listen(3000);
