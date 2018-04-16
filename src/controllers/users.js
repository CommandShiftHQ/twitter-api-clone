const fs = require('fs-extra');
const path = require('path');

const file = path.join(__dirname, '..', '..', 'data', 'users.json');

const create = (req, res) => {
  fs.readFile(file, 'utf8') // get the existing list of users
    .then((data) => {
      const users = JSON.parse(data); // parse to javascript

      if (!req.body.name) { // check if the request has a name parameter
        return res.status(400).json({ // if not, send an error response - 400 means client error
          error: 'User requires a name',
        });
      }

      if (!req.body.handle) { // check if the request has a handle parameter
        return res.status(400).json({ // if not, send an error response - 400 means client error
          error: 'User requires a handle', 
        });
      }

      // check if the the list of users contains a user with the handle from the request
      if (users.some(u => u.handle === req.body.handle)) {
        return res.status(400).json({ // if not, send an error response - 400 means client error
          error: 'User handle must be unique', 
        });
      }

      // if the request is valid, create a new user object with the right properties
      const user = {
        name: req.body.name,
        handle: req.body.handle,
      };

      users.push(user); // add the new user from the request to the existing list
      return fs.writeFile(file, JSON.stringify(users)); // add the new list of users to the file
        .then(() => {
          res.sendStatus(201); // then send a success response
        });
    })
    .catch((error) => { // if something unexpected happens
      console.log(error); // log the raw error to the console (don't send it to the client!)
      res.status(500).json({ // send an error (500 means server error)
        error: 'Unable to create user', // send a friendly message
      });
    });
};

module.exports = {
  create,
};