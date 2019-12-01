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

const User = require('./models/User.model');
const Profil = require('./models/Profil.model');
const File = require('./models/File.model');
const GoldStar = require('./models/GoldStar.model');
const Offer = require('./models/Offer.model');
const OfferFile = require('./models/OfferFile.model');

const Jimp = require('jimp');//img resizer



var stars = require("./routes/stars.js")(app, GoldStar);//asi jedna z moznosti, u stars to funguje

// var users = require("./routes/users");
// app.use('/users', users);

var test = require("./routes/test.js")(app);
var test2 = require('./test2')
app.use('/test2', test2)
// test(456)
// test.on('ready', () => {
//   console.log('module "a" is ready');
// });
mongoose.set('useFindAndModify', false);
// ---mongoose---!!! nevim jestli byt porad pripojeden k DB nebo pri kazdym dotazu se pripojit zvlast
mongoose.connect('mongodb://localhost:27017/naden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
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



let uploadOffer = multer({//offer multer, který predavame jako parametr u upload POST
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let folder = req.body.email;
      let index = req.body.currentOfferIndex
      console.log(req.body);
      let path = `./uploads/${folder}/offers/${index}`;//uploaduje fotku offers do slozky s predanym indexem
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

app.route('/users')
  .get(function (req, res) {
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
  .post(function (req, res) {
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
  .put(function (req, res) {
    res.send('Update the book')
  })




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

app.get('/profilesFiltered', function(req, res) {//vraci profili na zaklade city, ale tohle je nahovno to posilat v query, lepsi je v data, ale vlastne u filtru je to jedno
  // var cityAndJob = {}
  console.log(req.query.city + req.query.job)
  // console.log(Object.keys(req.params.cityAndJob))
  if (req.query.city === 'Vše' && req.query.job === 'Vše') {
    Profil.find({}).exec(function(err, profil) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(profil);
      }
    })
  } else if ( req.query.job === 'Vše') {
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
  } else if ( req.query.city === 'Vše' ) {
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
  console.log(req.params.id + req.body.firstName + req.body.lastName + req.body.email)
  Profil.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
        // console.log( '/profiles/:id' + editProfil);
        res.send(editProfil);
      }
    });
});

//PROFILEDIT
app.get('/profilesedit/:_id', function(req, res) {//naplní profilEdit
  // console.log(req.params._id)
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
app.get('/img/:email', function(req, res) { //vrati fotky vazane k danemu emailu z profils
  // console.log(req.params.email)
  File.find({
    email: req.params.email
  }).exec(function(err, img) {
    // img = img.map(function(value, index) {//vrati nove pole obsahujici jen cestu k obrazku
    //   return value.pathToResizedImg
    // })
    if (err) {
      res.send('error has occured');
    } else {
      res.json(img);
    }
  })
})

app.get('/imgoffer', function(req, res) { //vrati fotky vazane k danemu emailu z offers
  // console.log(req.query.email + req.query.index)
  OfferFile.find({
    email: req.query.email,
    index: req.query.index
  }).exec(function(err, img) {
    if (err) {
      res.send('error has occured');
    } else {
      res.json(img);
    }
  })
})

let uploadProfil = multer({//profilový multer, který predavame jako parametr u upload POST
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let folder = req.body.email;

      console.log(req.body);
      let path = `./uploads/${folder}/profil/original`;
      fse.mkdirsSync(path);
      callback(null, path);
      let pathToResized = `./uploads/${folder}/profil/resized/`;
      fse.mkdirsSync(pathToResized);
      callback(null, pathToResized);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded file's name with extn
      callback(null, file.originalname);
    }
  })
});

app.post('/img', uploadProfil.single('productImage'), (req, res, next) => { //upload fotky profil
  // console.log(req.body.profilPhoto.length);
  // if (req.body.profilPhoto.length === 0) {
  const file = new File({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    profilPhoto: req.body.profilPhoto,
    modified: new Date().toISOString(),
    productImage: req.body.email + "/original/" + req.file.originalname,
    pathToResizedImg: "http://localhost:8081/uploads/" + req.body.email + "/profil/resized/" + req.file.originalname
  });
  file.save()
    .then(result => {
      // console.log(result);
      res.status(201).json({
        message: 'Create product successfully',
        createdProduct: {
          name: result.name,
          modified: result.modified
        }
      });
    });

  Jimp.read('uploads/' + req.body.email + "/profil/original/" + req.file.originalname)
    .then(img => {
      return img
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        // .greyscale() // set greyscale
        .write('uploads/' + req.body.email + "/profil/resized/" + req.file.originalname); // save
    })
    .catch(err => {
      console.error(err);
    });
})

app.post('/imgoffer', uploadOffer.single('productImage'), (req, res, next) => { //upload fotky offer, filesystem + db
  // console.log(req.body.currentOfferIndex)
  const file = new OfferFile({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    index: req.body.currentOfferIndex,
    modified: new Date().toISOString(),
    path: req.body.email + "/offers/" + req.body.currentOfferIndex + "/" + req.file.originalname
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
  // console.log(req.params.email)
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
  console.log(req.params.id)
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
// app.post('/goldstars', function(req, res) { //prida zlatou hvezdu, musim ale zajistit aby se vytvorila kolekce, defacto pri zalozeni uctu se musi zalozit vsechny potrebne kolekce
//   console.log(req.query.ownerEmail + req.query.markerEmail)
//   const star = new GoldStar({
//     ownerEmail: req.query.ownerEmail,
//     markerEmail: req.query.markerEmail
//   });
//     star.save(function(err, star) {
//       if (err) {
//         res.send('error saving user')
//       } else {
//         console.log(star);
//         res.send(star);
//       }
//     });
// });
//
// //takze potrebuju aggregation framework pro mongodb, ptze samotny mongo neumi vracet arry na nejvyssi urovni
// //musim pouzivat mongoose prikazy a ne mongo nativni
// app.get('/goldstars/:email', function(req, res) { //vrati pocet zlatych hvezd
//   console.log('/goldstars/:email' + req.params.email)
//   GoldStar.find({
//     ownerEmail: req.params.email
//   }).exec(function(err, goldStar) {
//     if (err) {
//       res.send('error has occured');
//     } else {
//       console.log(goldStar)
//       res.json(goldStar);
//     }
//   })
// })

//OFFERS
app.put('/offersedit/:id', function(req, res) {//updatuje stavajici offer
  // console.log('/offersedit/:id' + " " + req.body.email)
  Offer.findOneAndUpdate({
      email: req.body.email
    }, {
      $set: {
        email: req.body.email,
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        aboutOffer: req.body.aboutOffer,
        currency: req.body.currency,
        showOffer: req.body.showOffer,
        city: req.body.city,
        exposeDate: req.body.exposeDate,
        hideDate: req.body.hideDate
      }
    }, {
      upsert: true
    },
    function(err, editOffer) {
      if (err) {
        console.log(err);
      } else {
        console.log( '/offer/:id' + editOffer);
        res.send(editOffer);
      }
    });
});

app.post('/newOffer/:id', function(req, res) { //prida zlatou hvezdu, musim ale zajistit aby se vytvorila kolekce, defacto pri zalozeni uctu se musi zalozit vsechny potrebne kolekce
const offer = new Offer({
    email: req.body.email,
    title: req.body.title,
    price: req.body.price,
    category: req.body.selectedCategoryItems,
    aboutOffer: req.body.aboutOffer,
    currency: req.body.currency,
    showOffer: req.body.showOffer,
    city: req.body.city,
    exposeDate: req.body.exposeDate,
    hideDate: req.body.hideDate
  });
    offer.save(function(err, offer) {
      if (err) {
        res.send('error saving offer')
      } else {
        console.log(offer);
        res.send(offer);
      }
    });
});
app.get('/offers/:email', function(req, res) {//naplní offerEdit
  console.log('/offers/:email' + " " + req.params.email)
  Offer.find({
    email: req.params.email
  }).exec(function(err, offer) {
    if (err) {
      res.send('error has occured');
    } else {
      res.json(offer);
    }
  })
})

app.get('/offers', function(req, res) {//vraci vsechny offers
console.log("offers get")
  Offer.find({

  }).exec(function(err, offer) {
    if (err) {
      res.send('error has occured');
    } else {
      res.json(offer);
    }
  })
})

app.get('/offersFiltered', function(req, res) {//vraci profili na zaklade city, ale tohle je nahovno to posilat v query, lepsi je v data, ale vlastne u filtru je to jedno
  // var cityAndJob = {}
  console.log(req.query.city + req.query.category)
  // console.log(Object.keys(req.params.cityAndJob))
  if (req.query.city === 'Vše' && req.query.category === 'Vše') {
    Offer.find({}).exec(function(err, offer) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(offer);
      }
    })
  } else if ( req.query.category === 'Vše') {
    Offer.find({
      city: req.query.city
      // job: req.query.job
    }).exec(function(err, offer) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(offer);
      }
    })
  } else if ( req.query.city === 'Vše' ) {
    Offer.find({
      // city: req.query.city
      category: req.query.category
    }).exec(function(err, offer) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(offer);
      }
    })
  } else {
    Offer.find({
      city: req.query.city,
      category: req.query.category
    }).exec(function(err, offer) {
      if (err) {
        res.send('error has occured');
      } else {
        res.json(offer);
      }
    })
  }
})
app.listen(process.env.PORT || 8081)
