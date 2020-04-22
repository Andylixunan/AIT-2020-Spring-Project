require('./db');

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Photo = mongoose.model('Photo');
const Album = mongoose.model('Album');
const User = mongoose.model('User');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/photo/test', (req, res)=>{
  Photo.find({}, function(err, data, count){
    res.send(data);
  });
})



app.listen(3000);