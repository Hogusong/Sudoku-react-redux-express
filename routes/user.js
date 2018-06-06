var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('sudoku');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.users.find(function(err, docs){
    res.json(docs)
  })
});

/* Log in a user. */
router.post('/login', function(req, res, next) {
  console.log('I am login', req.body);
  const user = req.body;
  db.users.find({ username: user.username, password: user.password }, function(err, docs){
    if( err || docs.length < 1 ) {
      const email = user.username
      db.users.find({ email: user.username, password: user.password }, function(err, docs){
        if ( err || docs.length < 1 ) res.json(null) ;
        res.json(docs[0])
      })
    } else { 
      res.json(docs[0])
    }
  })
});

/* Sign in a user. */
router.post('/signin', function(req, res, next) {
  console.log('Sign in: ', req.body.username);
  db.users.find({ username : req.body.username }, function(err, docs){
    if( !err && docs.length < 1 ) {
      db.users.save({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        saved: {}, solved: {},  upload: {}, since: null
      }, function(err, saved) {
        if(err || !saved) res.json(null);
        else {
          db.users.find({ username : req.body.username }, function(err, docs){
            res.json(docs[0]);        
          })
        }
      })
    } else {
      res.json(null);
    }
  })
});

/* Update user's info. */
router.post('/update', function(req, res, next) {
  const olduser = req.body[0];
  const newuser = req.body[1];
  let result = '';
  result = checkValidate(newuser);
  if ( !result && olduser.firstname !== newuser.firstname) {
    result = isNameTaken(newuser.firstname)
  }
  if ( !result && olduser.email !== newuser.email) {
    result = isEmailTaken(newuser.email)
  }

  if ( !result ) {
    db.users.find({ firstname: olduser.firstname }, function(err, docs){
      if (err) res.json("System erro. Try again.")
      else if ( docs.length < 1 ) res.json("No username found.") ;
      else  {
        const id = docs[0]._id;
        db.users.update({_id: id}, {$set: {
              firstname: newuser.firstname,
              lastname: newuser.lastname,
              email: newuser.email
        }})
        newuser._id = id;
        res.json(newuser);
      }
    })
  } else { 
    res.json(result);
  }
});

function checkValidate(user) {
  console.log(user);
  if (user.firstname.length < 3) return "username is too short.";
  if (user.email.indexOf('@') < 3) return "email address is wrong"
  return '';
}

function isNameTaken(name) {
  db.users.find({ firstname: name }, function(err, docs){
    if (err) return err;
    if (docs.length > 0) return "Username is not valid.";
    return '';
  })
}

function isEmailTaken(email) {
  db.users.find({ email: email }, function(err, docs){
    if (err) return err;
    if (docs.length > 0) return "Email is not valid.";
    return null;
  })
}

module.exports = router;
