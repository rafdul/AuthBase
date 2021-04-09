const express = require('express');
const router = express.Router();

const isLogged = (req, res, next) => {
  if(req.user == undefined){
    res.redirect('/user/no-permission');
    console.log(req.user);
  } else {
    next();
  }
};

router.get('/logged', (req, res) => {
  req.user ? res.render('logged', {name: req.user.name.givenName, avatar: req.user.photos[0].value}) : res.redirect('no-permission');
  console.log('req.user logged', req.user);
  console.log('avatar', req.user.photos[0].value);
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', isLogged, (req, res) => {
  // req.user ? res.render('profile') : res.redirect('no-permission');
  res.render('profile');
});

router.get('/profile/settings', isLogged, (req, res) => {
  // req.user ? res.render('settings') : res.redirect('no-permission');
  res.render('settings');
});

module.exports = router;