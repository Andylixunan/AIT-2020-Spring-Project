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

let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/YOUR_DATABASE_NAME_HERE';
}

mongoose.connect(dbconf,  {useNewUrlParser: true, useUnifiedTopology: true });

