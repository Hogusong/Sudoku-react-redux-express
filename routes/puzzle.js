var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('sudoku');

// Upload a new puzzle //
router.post('/upload', function(req, res, next) {
  const { username, type, puzzle } = req.body;
  db.puzzles.find(function(err, docs) {
    var puzzle_no = '10001';
    if (docs.length > 0) puzzle_no = String(parseInt(docs[docs.length-1].no, 10) + 1);
    db.puzzles.save({ no: puzzle_no, type: type, puzzle: puzzle }, function(err, saved) {
      if (!err && saved) {
        db.puzzleGroup.find({ type: type, username: username }, function(err, docs) {
          if (docs.length < 1) {
            db.puzzleGroup.save({ type: type, username: username, puzzles: [puzzle_no] }, function(err, saved) {
              if(err || !saved) console.log('fali to create PuzzlegrpupDB')
              else console.log('PuzzleGrpupDB is created')
            })    
          } else {
            const id = docs[0]._id;
            const puzzles = docs[0].puzzles;
            puzzles.push(puzzle_no);
            db.puzzleGroup.update({ _id: id }, {$set: { puzzles: puzzles }})
          }
        })
      }
    })  
  })
  res.json(null);
})

// Pick a puzzle randomly //
router.post('/random', function(req, res, next) {
  const username = req.body.username;
  const type = req.body.config.level + '_' + req.body.config.size;
  db.puzzleGroup.find({ type: type, username: 'admin' }, function(err, docs) {
    if (!err && docs.length > 0) {
      let numbers = docs[0].puzzles;
      db.puzzleGroup.find({ type: type, username: username }, function(err, docs) {
        numbers = numbers.concat(docs[0].puzzles);
        console.log('numbers:', numbers)
        let puzzle_no = ''
        const repeat = Math.floor(Math.random()*9);
        for (let i=0; i<repeat; i++) {
          puzzle_no = numbers[Math.floor(Math.random() * numbers.length)];
        }
        db.puzzles.find({ no: puzzle_no }, function(err, docs) {
          if (err || docs.length < 1) { 
            res.json(null) ;
          } else {
            const puzzle_info = { puzzle_no: puzzle_no, type: type, 
                                  puzzle: docs[0].puzzle } ;
            console.log('last step in server:', puzzle_info);
            res.json(puzzle_info);
          }
        })
      })
    } else {
      res.json(null);
    }
  })
})

module.exports = router;
