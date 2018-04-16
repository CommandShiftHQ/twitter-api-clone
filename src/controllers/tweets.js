const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid/v4');

const file = path.join(__dirname, '..', '..', 'data', 'tweets.json');
const usersFile = path.join(__dirname, '..', '..', 'data', 'users.json');

/*
  Lists all tweets, along with the user who posted them
*/
const index = (req, res) => {
  // Promise.all allows you to fire multiple asynchronous actions at the same time
  // It will only move on to the .then block when ALL of the actions have completed
  Promise.all([
    fs.readFile(file, 'utf8'), // read the list of tweets from the tweets file
    fs.readFile(usersFile, 'utf8'), // read the list of users from the users file
  ])
    .then((data) => {
      const tweets = JSON.parse(data[0]); // convert the tweets from JSON to javascript
      const users = JSON.parse(data[1]); // convert the users from JSON to javascript
      
      const userTweets = tweets.map((tweet) => {
        const user = users.find((u) => u.handle === tweet.userHandle); // find the user who posted the tweet

        const defaultUser = { handle: 'default', name: 'Default User' }; // if there is no user found, we will use this object instead
        
        return {
          user: user || defaultUser, // if we have the user, return that, otherwise use the default
          message: tweet.message, 
          id: tweet.id,
        };
      });


      res.status(200).json(userTweets); // respond with the list of tweets
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ // if there is an error, send an error response
        error: 'Unable to retrieve tweets',
      });
    });
};

const create = (req, res) => {
  fs.readFile(file, 'utf8') // get the existing list of tweets
    .then((data) => {
      const tweets = JSON.parse(data); // parse to javascript

      // create the new tweet object
      const tweet = {
        id: uuid(), // assign a random id to our new tweet
        message: req.body.message || 'default tweet',
        userHandle: req.params.handle,
      };

      tweets.push(tweet); // add the tweet to the existing list of tweets
      return fs.writeFile(file, JSON.stringify(tweets)); // save the list of tweets to the file
        .then(() => {
          res.sendStatus(201);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ // if there is an error, send an error response
        error: 'Unable to create tweet',
      });
    });
};

module.exports = {
  index,
  create,
};