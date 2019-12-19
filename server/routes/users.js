var express = require('express');
var users = express.Router();
const User = require('./../models/User.model');

  users.get('/users', function(req, res) {
    const email = req.query.login[0];
    const password = req.query.login[1];
    console.log(req.query.login[0]);
    console.log(req.query.login[1]);

    User.find({
      $and: [{
        email: email
      }, {
        password: password
      }]
    }).exec(function(err, user) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(user);
      }
    })
  })
  users.post('/users',function(req, res) {
    var newUser = new User();
    // console.log("new user" + req.body.email)
    console.log(req.body.email)
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    if (!fs.existsSync("uploads/" + req.body.email)) {
      fs.mkdirSync("uploads/" + req.body.email);
    }

    newUser.save(function(err, user) {
      if (err) {
        res.send('error saving user')
      } else {
        console.log(user);
        res.send(user);
      }
    });
  })
  users.put('/users', function(req, res) {
    res.send('Update the book')
  })

module.exports = users;
