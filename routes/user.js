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
  const search = req.body.username;
  if (search.indexOf("@") < 0) {
    db.users.find({ username: search, password: req.body.password }, function(err, docs){
      if( err || docs.length < 1 ) {
        res.json(null) 
      } else {
        docs[0].password = '0000'
        res.json(docs[0])
      }
    })
  } else { 
    db.users.find({ email: search, password: req.body.password }, function(err, docs){
      if( err || docs.length < 1 ) {
        res.json(null) 
      } else {
        docs[0].password = '0000'
        res.json(docs[0])
      }
    })
  }
});

/* Sign in a user. */
router.post('/signin', function(req, res, next) {
  db.users.find({ username : req.body.username }, function(err, docs){
    if( !err && docs.length < 1 ) {
      const date = (new Date()).toDateString().slice(4)
      db.users.save({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        config : {
          size: '9x9',  level: 'medium',  choice: 'random',
          hint: 0,   time_count: 'yes'
        },
        saved: [], solved: [], since: date
      }, function(err, saved) {
        if(err || !saved) res.json(null);
        else {
          db.users.find({ username : req.body.username }, function(err, docs){
            docs[0].password = '0000'
            res.json(docs[0]);        
          })
        }
      })
    } else {
      res.json(null);
    }
  })
});

/* Setup user's config. */
router.post('/setup', function(req, res, next) {
  const { username, config } = req.body;
  config.hint = parseInt(config.hint);
  db.users.update({ username: username }, {$set: { config: config }})
  db.users.find({ username: username }, function(err, docs) {
    if (err || docs.length < 1) {
      res.json(null);
    } else {
      docs[0].password = '0000'
      res.json(docs[0])  
    }
  })
})
 
// Upload a new puzzle //
router.post('/solved', function(req, res, next) {
  const { username, puzzle_no, hint, wrong, type, seconds } = req.body;
  db.users.find({ username: username }, function(err, docs) {
    if (docs.length > 0) {
      const id = docs[0]._id
      const solved = docs[0].solved
      solved.push({puzzle_no, type, hint, wrong, seconds})
      db.users.update({ _id: id }, {$set: { solved: solved }})
      db.users.find({ _id: id }, function(err, docs) {
        if (docs.length > 0) res.json(docs[0]) ;
        else res.json(null) ;
      })
    } else {
      res.json(null)
    }
  })
})

/*
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
*/

module.exports = router;
