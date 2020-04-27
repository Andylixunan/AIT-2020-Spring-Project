require('./db');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const urlSlug = require('url-slug');

const mongoose = require('mongoose');
const Photo = mongoose.model('Photo');
const Album = mongoose.model('Album');
const User = mongoose.model('User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.urlencoded({ extended: false }));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
    res.locals.userObjId = req.user._id;
  }
  next();
});


// route handlers
app.get('/', (req, res) => {
  res.render('index');
});

// login
app.post('/', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/album');
});

app.get('/album/:albumSlug/createPhoto', (req, res) => {
  if (!req.user) {
    res.render('notLoggedIn');
  }
  else {
    res.render('createPhoto');
  }
});

app.post('/album/:albumSlug/createPhoto', (req, res) => {
  const photoObj = new Photo({
    name: req.body.photoName,
    url: req.body.photoUrl
  });
  photoObj.save(function (err, varToStoreResult) {
    Album.findOne({ user: res.locals.userObjId }, function (err, data) {
      data.photos.push(varToStoreResult._id);
      data.save();
    })
    res.redirect('/album/' + req.params.albumSlug);
  });
})

app.get('/album/:albumSlug', (req, res) => {
  if (!req.user) {
    res.render('notLoggedIn');
  }
  else {
    Album.findOne({ user: res.locals.userObjId, slug: req.params.albumSlug }, function (err, data) {
      const photoRefArr = data.photos;
      let photoArr = [];
      photoRefArr.forEach(element => {
        Photo.findById(element, function (err, foundPhoto) {
          photoArr.push(foundPhoto);
        });
      });
      const createLink = "/album/" + req.params.albumSlug + "/createPhoto";
      res.render('photo', { photo: photoArr, link: createLink });
    });
  }
});

app.get('/album', (req, res) => {
  if (!req.user) {
    res.render('notLoggedIn');
  }
  else {
    User.findOne({ username: res.locals.user.username }, function (err, data) {
      const albumRefArr = data.album;
      let albumArr = [];
      albumRefArr.forEach(element => {
        Album.findById(element, function (err, foundAlbum) {
          albumArr.push(foundAlbum);
        });
      });
      res.render('album', { user: res.locals.user, album: albumArr });
    });
  }
});

app.get('/albumCreate', (req, res) => {
  if(!req.user){
    res.render('notLoggedIn');
  }
  else{
    res.render('createAlbum');
  }
});

app.post('/albumCreate', (req, res) => {
  const slugValue = urlSlug(req.body.albumName);
  const albumObj = new Album({
    user: res.locals.userObjId,
    name: req.body.albumName,
    photos: [],
    slug: slugValue
  });
  albumObj.save(function (err, varToStoreResult) {
    User.findOne({ username: res.locals.user.username }, function (err, data) {
      data.album.push(varToStoreResult._id);
      data.save();
    });
    res.redirect('/album');
  });
});

app.get('/register', (req, res) => {
  if(!req.user){
    res.render('notLoggedIn');
  }
  else{
    res.render('register');
  }
});

app.post('/register', (req, res) => {
  User.register(new User({ username: req.body.registerUsername, album: [] }), req.body.registerPassword, function (err) {
    if (err) {
      console.log(err);
      res.render('register');
    }
    const authenticate = User.authenticate();
    authenticate(req.body.registerUsername, req.body.registerPassword, function (err, ) {
      if (err) {
        console.log(err);
      }
      res.redirect('/')
    })
  });
});


app.listen(process.env.PORT || 3000);
