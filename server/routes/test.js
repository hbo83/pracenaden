module.exports = function(app) {
  app.get('/test', function(req, res) { //prida zlatou hvezdu, musim ale zajistit aby se vytvorila kolekce, defacto pri zalozeni uctu se musi zalozit vsechny potrebne kolekce
    console.log('popo')
  });
}
