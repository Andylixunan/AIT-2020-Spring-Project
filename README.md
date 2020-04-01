# Photo Album 

## Overview


I intend to build a simple web application that mimics the functionality of a photo
album in our daily life. In this app, users are allowed to register and login. And after 
loging in, users can view, add, delete their photo collections. In addition, a single user
can keep track of multiple photo albums.


## Data Model

The application will store Users, Albums and Photos(url)

* users can have multiple albums (via references)
* each album can have multiple photos' urls (by embedding)


An Example User:

```javascript
{
  username: "photokeeper",
  hash: // a password hash,
  albums: // an array of references to album documents
}
```

An Example List with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "my first album",
  photos: [
    { name: "selfie", url: "www.foo.bar"},
    { name: "me and parents", url: "www.bar.qux"},
  ]
}
```


## [Link to Commented First Draft Schema](db.js) 


## Wireframes


/album/create - page for creating a new photo album

![album create](documentation/album-create.png)

/album - page for showing all photo albums

![album](documentation/album.png)

/album/slug - page for showing all photos in a specific photo album

![album](documentation/album-slug.png)

/photo/create = page for creating a new photo item in an album

![photo create](documentation/photo-create.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new photo album
4. as a user, I can view all of the photos I've uploaded in a single album
5. as a user, I can add photos to an existing photo album
6. as a user, I can delete photos in an existing photo album
7. as a user, I can delete a whole photo album that I've created

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points 


## [Link to Initial Main Project File](app.js) 


## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

