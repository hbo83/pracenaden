const express = require('express');//alt + 124 = | alt+38 = &
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
const GoldStar = require('./GoldStar.model');

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

app.get('/profilesFiltered', function(req, res) {//varci profili na zaklade city, ale tohle je nahovno to posilat v query, lepsi je v data, ale vlastne u filtru je to jedno
  // var cityAndJob = {}
  console.log(req.query.city + req.query.job)
  // console.log(Object.keys(req.params.cityAndJob))
  if ( req.query.job === '' || req.query.job === 'Vše') {
    Profil.find({
      city: req.query.city
      // job: req.query.job
    }).exec(function(err, profil) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(profil);
      }
    })
  } else if (req.query.city === '' || req.query.city === 'Vše' ) {
    Profil.find({
      // city: req.query.city
      job: req.query.job
    }).exec(function(err, profil) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(profil);
      }
    })
  } else if (req.query.city === 'Vše' && req.query.job === 'Vše') {
    Profil.find({
      // city: req.query.city
      // job: req.query.job
    }).exec(function(err, profil) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(profil);
      }
    })
  } else {
    Profil.find({
      city: req.query.city,
      job: req.query.job
    }).exec(function(err, profil) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(profil);
      }
    })

  }
})



app.get('/profiles/:email', function(req, res) { //vrací profil na základě emailu
  // console.log(req.params.email)
  Profil.find({
    email: req.params.email
  }).exec(function(err, profil) {
    if (err) {
      res.send('error has occured');
    } else {
      res.json(profil);
    }
  })
})


app.put('/profiles/:id', function(req, res) {
  console.log(req.params.id)
  Profil.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        phoneVisible: req.body.phoneVisible,
        job: req.body.job,
        money: req.body.money,
        category: req.body.category,
        description: req.body.description,
        city: req.body.city,
        web: req.body.web,
        webVisible: req.body.webVisible,
        facebook: req.body.facebook,
        facebookVisible: req.body.facebookVisible,
        instagram: req.body.instagram,
        instagramVisible: req.body.instagramVisible,
        skype: req.body.skype,
        skypeVisible: req.body.skypeVisible,
        whatsapp: req.body.whatsapp,
        whatsappVisible: req.body.whatsappVisible,
        aboutMe: req.body.aboutMe,
        checkboxAgree: req.body.checkboxAgree,
        osvc: req.body.osvc,
        currency: req.body.currency,
        hideProfil: req.body.hideProfil
      }
    }, {
      upsert: true
    },
    function(err, editProfil) {
      if (err) {
        console.log(err);
      } else {
        console.log( '/profiles/:id' + editProfil);
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
app.get('/img/:email', function(req, res) { //vrati fotky vazane k danemu emailu
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

app.post('/img', upload.single('productImage'), (req, res, next) => { //upload fotky
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
})

app.put('/imgFalse/:email', function(req, res) { //oznaci vsechny fotky na profil false
  console.log(req.params.email)
  File.updateMany({
      email: req.params.email
    }, {
      $set: {
        profilPhoto: false,
      }
    },
    function(err, profilPhoto) {
      if (err) {
        console.log(err);
      } else {
        console.log(profilPhoto);
        res.send(profilPhoto);
      }
    });
});

app.put('/img/:id', function(req, res) { //oznaci fotku jako profilovou
  // console.log(req.params._id)
  File.findOneAndUpdate({
      _id: req.params.id,
    }, {
      $set: {
        profilPhoto: req.body.profilPhoto,
      }
    },
    function(err, profilPhoto) {
      if (err) {
        console.log(err);
      } else {
        console.log(profilPhoto);
        res.send(profilPhoto);
      }
    });
});

app.delete('/img/:id', function(req, res) { //smaze fotku
  File.findOneAndRemove({
    _id: req.params.id
  }, function(err, file) {
    if (err) {
      console.log(err);
    } else {
      console.log('/img' + file);
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

//STARS
app.post('/goldstars', function(req, res) { //prida zlatou hvezdu, musim ale zajistit aby se vytvorila kolekce, defacto pri zalozeni uctu se musi zalozit vsechny potrebne kolekce
  console.log(req.query.ownerEmail + req.query.markerEmail)
  const star = new GoldStar({
    ownerEmail: req.query.ownerEmail,
    markerEmail: req.query.markerEmail
  });
    star.save(function(err, star) {
      if (err) {
        res.send('error saving user')
      } else {
        console.log(star);
        res.send(star);
      }
    });
});

//takze potrebuju aggregation framework pro mongodb, ptze samotny mongo neumi vracet arry na nejvyssi urovni
//musim pouzivat mongoose prikazy a ne mongo nativni
app.get('/goldstars/:email', function(req, res) { //vrati pocet zlatych hvezd
  console.log('/goldstars/:email' + req.params.email)
  GoldStar.find({
    ownerEmail: req.params.email
  }).exec(function(err, goldStar) {
    if (err) {
      res.send('error has occured');
    } else {
      console.log(goldStar)
      res.json(goldStar);
    }
  })
})



app.listen(process.env.PORT || 8081)
