
module.exports = function (router, passport) {
  //localhost:8080/auth/
  router.get('/', function (req, res) {
    res.render('index.ejs');
  });

  router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

  router.get('/facebook/callback',
      passport.authenticate('facebook', {successRedirect: '/profile',
        failureRedirect: '/'}));

  router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

  router.get('/google/callback',
      passport.authenticate('google', {successRedirect: '/profile',
        failureRedirect: '/'}));

  router.get('/connect/facebook', passport.authorize('facebook', {scope: 'email'}));
  router.get('/connect/google', passport.authorize('google', {scope: ['profile', 'email']}));

  router.get('/unlink/facebook', function (req, res) {
    var user = req.user;

    user.facebook.token = null;

    user.save(function (err) {
      if (err)
        throw err;
      res.redirect('/profile');
    });
  });

  router.get('/unlink/google', function (req, res) {
    var user = req.user;
    user.google.token = null;

    user.save(function (err) {
      if (err)
        throw err;
      res.redirect('/profile');
    });
  });

  router.get('/logout', function (req, res) {
    res.clearCookie('userid');
    req.logout();
    res.redirect('/');
  });
};