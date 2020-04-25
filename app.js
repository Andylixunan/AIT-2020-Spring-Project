require('./db');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
//const urlSlug = require('url-slug');

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


app.use(function(req, res, next){
  res.locals.user = req.user;
  console.log(req.user);
	next();
});

// route handlers
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/photo/create', (req, res) => {
  res.render('createPhoto');
});

app.post('/photo/create', (req, res) => {
  const photoObj = new Photo({
    name: req.body.photoName,
    url: req.body.photoUrl
    });
  photoObj.save(function(err, varToStoreResult, count){
    res.redirect('/album');
  });
})

app.get('/album',(req, res)=>{
  res.render('album');
});

app.get('/album/create',(req, res)=>{

  res.render('createAlbum');
});

app.post('/album/create',(req, res)=>{
  const albumObj = new Album({
    name: req.body.albumName,
    photos: []
  });
  albumObj.save(function(err, varToStoreResult, count){
    res.redirect('/album');
  });
});

// add test site for viewing and testing all the working forms
app.get('/photo/test', (req, res)=>{
  Photo.find({}, function(err, data, count){
    res.send(data);
  });
})

app.get('/album/test', (req, res)=>{
  Album.find({}, function(err, data, count){
    res.send(data);
  });
})



app.get('/register', (req, res) =>{
  res.render('register');
});

app.post('/register', (req, res) =>{
  User.register(new User({username: req.body.registerUsername, album: []}), req.body.registerPassword, function(err, user) {
      if (err) {
        console.log(err);
        res.render('register');
      }
      passport.authenticate('local')(req, res, function(){
        res.redirect('/');
      });
  });
});


app.listen(process.env.PORT || 3000);
