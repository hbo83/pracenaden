var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/users', function (req, res) {
  const email = req.query.login[0];
  const password = req.query.login[1];
  // console.log(req.query.login[0]);
  // console.log(req.query.login[01]);

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

router.post('/users', function (req, res) {
  console.log(req.body.email)
  var newUser = new User();

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

module.exports = router



// module.exports = function(app, User) {
// app.get('/users', function(req, res) {
//     const email = req.query.login[0];
//     const password = req.query.login[1];
//     console.log(req.query.login[0]);
//     console.log(req.query.login[01]);
//
//     User.find({
//       $and: [{
//         email: email
//       }, {
//         password: password
//       }]
//     }).exec(function(err, user) {
//       if (err) {
//         res.send('error has occured');
//       } else {
//         res.json(user);
//       }
//     })
//   })
//
//   app.post('/users', function(req, res) {
//     console.log(req.body.email)
//     var newUser = new User();
//
//     newUser.email = req.body.email;
//     newUser.password = req.body.password;
//
//     if (!fs.existsSync("uploads/" + req.body.email)) {
//       fs.mkdirSync("uploads/" + req.body.email);
//     }
//
//     newUser.save(function(err, user) {
//       if (err) {
//         res.send('error saving user')
//       } else {
//         console.log(user);
//         res.send(user);
//       }
//     });
//   });
//
// }
