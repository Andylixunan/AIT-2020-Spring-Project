const mongoose = require('mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * they also have 0 or more albums
const User = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  album:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }]
});

// a photo in an album
// * includes the name and url of the photo
// * photos in an album can be deleted by users
const Photo = new mongoose.Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
});

// an album
// * each album must have a related user
// * an album can have 0 or more photos
const Album = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
  photos: [Photo]
});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below

mongoose.model('User', User);
mongoose.model('Photo', Photo);
mongoose.model('Album', Album);


