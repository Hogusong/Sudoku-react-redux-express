var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('sudoku');

// Upload a new puzzle //
router.post('/upload', function(req, res, next) {
  const { username, type, puzzle } = req.body;
  db.puzzles.find(function(err, docs) {
    let puzzle_no = 10001;
    if (docs.length > 0) puzzle_no = docs[docs.length-1].no + 1    
    db.puzzles.save({ no: puzzle_no, type: type, puzzle: puzzle }, function(err, saved) {
      if (!err && saved) {
        db.users.find({ username: username }, function(err, docs) {
          if (docs.length > 0) {
            const id = docs[0]._id;
            const upload = docs[0].upload;
            upload.push(puzzle_no)
            db.users.update({_id: id}, {$set: { upload: upload }})
          }
        })
        db.puzzleGroup.find({ type: type }, function(err, docs) {
          if (docs.length < 1) {
            db.puzzleGroup.save({ type: type, puzzles: [puzzle_no] }, function(err, saved) {
              if(err || !saved) console.log('fali to create PuzzlegrpupDB')
              else console.log('PuzzleGrpupDB is created')
            })    
          } else {
            const puzzles = docs[0].puzzles;
            puzzles.push(puzzle_no);
            db.puzzleGroup.update({ type: type }, {$set: { puzzles: puzzles }})
          }
        })
      }
    })  
  })
  db.puzzleGroup.find(function(err,docs) {
    console.log(docs);
  })
  res.json(null);
})

module.exports = router;
