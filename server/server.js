const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
// const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const mongoose = require("mongoose");
const multer = require('multer');
var http = require('http');
// const scryptJs = require('scrypt-js');
let fse = require('fs-extra');
const app = express();

const User = require('./User.model');
const Profil = require('./Profil.model');
const File = require('./File.model');

mongoose.set('useFindAndModify', false);
// ---mongoose---!!! nevim jestli byt porad pripojeden k DB nebo pri kazdym dotazu se pripojit zvlast
mongoose.connect('mongodb://localhost:27017/naden', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { //test spojeni s DB
  console.log('spojeno k DB');
});

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

// var upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   }
// })

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let folder = req.body.email;
      console.log(req.body);
      let path = `./uploads/${folder}`;
      fse.mkdirsSync(path);
      callback(null, path);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded file's name with extn
      callback(null, file.originalname);
    }
  })
});

//parsuje tělo požadavku a pokud v něm najde nějaký JSON, tak s ním naplní hodnotu vlastnosti req.body.Bez tohoto middleware bychom v req.body nic nenašli.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())
app.use('/uploads', express.static('uploads'));
// app.use("/public", express.static(path.join(__dirname, 'public')));
app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

//USERS
app.get('/users', function(req, res) {
  const email = req.query.login[0];
  const password = req.query.login[1];
  console.log(req.query.login[0]);
  console.log(req.query.login[01]);

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

app.post('/users', function(req, res) {
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
});

//PROFILES
app.get('/profiles', function(req, res) {

  Profil.find({}).exec(function(err, profil) {
    if (err) {
      res.send('error has occured');
    } else {
      res.json(profil);
    }
  })
})

// app.post('/profiles', function(req, res) {
//   var newProfil = new Profil();
//   newProfil.email = req.body.email;
//   newProfil.phone = req.body.phone;
//   newProfil.name = req.body.name;
//   newProfil.job = req.body.job;
//   newProfil.money = req.body.money;
//   newProfil.city = req.body.city;
//   newProfil.description = req.body.description;
//   newProfil.web = req.body.web;
//   newProfil.facebook = req.body.facebook;
//   newProfil.instagram = req.body.instagram;
//   newProfil.skype = req.body.skype;
//   newProfil.whatsapp = req.body.whatsapp;
//   newProfil.aboutMe = req.body.aboutMe;
//   newProfil.offerMe = req.body.offerMe;
//   newProfil.checked = req.body.checked;
//
//   newProfil.save(function(err, profil) {
//     if (err) {
//       res.send('error saving profil')
//     } else {
//       console.log(profil);
//       res.send(profil);
//     }
//   });
// });

app.put('/profiles/:id', function(req, res) {
  console.log(req.params._id)
  Profil.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        job: req.body.job,
        money: req.body.money,
        category: req.body.category,
        description: req.body.description,
        city: req.body.city,
        web: req.body.web,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        skype: req.body.skype,
        whatsapp: req.body.whatsapp,
        aboutMe: req.body.aboutMe,
        offerMe: req.body.offerMe,
        checked: req.body.checked,
        checked2: req.body.checked2,
        currency: req.body.currency
      }
    }, {
      upsert: true
    },
    function(err, editProfil) {
      if (err) {
        console.log(err);
      } else {
        console.log(editProfil);
        res.send(editProfil);
      }
    });
});

//PROFILEDIT
app.get('/profilesedit/:_id', function(req, res) {
  console.log(req.params._id)
  Profil.find({
    _id: req.params._id
  }).exec(function(err, profil) {
    if (err) {
      res.send('error has occured');
    } else {
      res.json(profil);
    }
  })
})

//FILES
app.get('/img/:email', function(req, res) {
  console.log(req.params.email)
  File.find({
    email: req.params.email
  }).exec(function(err, img) {
    if (err) {
      res.send('error has occured');
    } else {
      res.json(img);
    }
  })
})

app.post('/img', upload.single('productImage'), (req, res, next) => {
  console.log(req.body.profilPhoto.length);
  // if (req.body.profilPhoto.length === 0) {
  const file = new File({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    profilPhoto: req.body.profilPhoto,
    modified: new Date().toISOString(),
    productImage: req.body.email + "/" + req.file.originalname
    // req.file.path
  });
  file.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Create product successfully',
        createdProduct: {
          name: result.name,
          modified: result.modified
        }
      });
    });
  // } else {
  //   const file = new File({
  //     _id: new mongoose.Types.ObjectId(),
  //     email: req.body.email,
  //     profilPhoto: req.body.profilPhoto,
  //     modified: new Date().toISOString(),
  //     productImage: req.body.email + "/" + "profilPhoto/" + req.file.originalname
  //   });
  //   file.save()
  //     .then(result => {
  //       console.log(result);
  //       res.status(201).json({
  //         message: 'Create product successfully',
  //         createdProduct: {
  //           name: result.name,
  //           modified: result.modified
  //         }
  //       });
  //     });
  // }

})

app.delete('/img/:id', function(req, res) {
  File.findOneAndRemove({
    _id: req.params.id
  }, function(err, file) {
    if (err) {
      console.log(err);
    } else {
      console.log(file);
      res.send(file);
    }
  })
  //dodelat smazani souboru pri vymazu img z DB
  // fs.unlink('uploads/sample.txt', function (err) {
  //   if (err) throw err;
  //   // if no error, file has been deleted successfully
  //   console.log('File deleted!');
  // });
})
app.listen(process.env.PORT || 8081)