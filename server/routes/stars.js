module.exports = function(app, GoldStar) {//zde ocekavam dva parametry: app premennou tedy instanci expressu a model GoldStar
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
}
