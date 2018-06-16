export default var Board = function (puzzle, size) {
  // this.playPuzzle = PUZZLE(size);
  this.solvedPuzzle = PUZZLE(size);
  // this.occupied = PUZZLE(size);
  if (!checkBoard(puzzle)) {
  } else {
    for (let r=0; r<size; r++) {
      for (let c=0; c<size; c++) {
        this.solvedPuzzle[r][c] = puzzle[r][c];
      }
    }
  }
}

Board.prototype.putNumber = function(r, c, value) {
  if ((!checkRow(r, c, value, this.playPuzzle)) &&
      (!checkColumn(r, c, value, this.playPuzzle)) &&
      (!checkSubsqare(r, c, value, this.playPuzzle))) {
    this.playPuzzle[r][c] = value;
    return true;
  }
  return false;
}

Board.prototype.getChildren = function() {
  if (this.isFull() && this.isValidState()) return null;
  console.log('get children mode', this.solvedPuzzle)
  const size = this.solvedPuzzle.length
  var minChildrenRow = -1;
  var minChildrenColumn = -1;
  var minChildren = size + 1;
  for (let r=0; r<size; r++) {
    for (let c=0; c<size; c++) {
      if (this.solvedPuzzle[r][c] === '') {
        var childrenCount = 0;
        for (let value=1; value < size+1; value++) {
          if (!checkColumn(r, c, value, this.solvedPuzzle) && 
              !checkRow(r, c, value, this.solvedPuzzle) && 
              !checkSubsqare(r, c, value, this.solvedPuzzle)) {
            childrenCount ++;
          }
        }
        if (childrenCount < minChildren) {
          minChildren = childrenCount;
          minChildrenRow = r;
          minChildrenColumn = c;
        }
      }
    }
  }
  if (minChildren > 0) {
    const returnedBoards = [];
    for (let i=0; i < minChildren; i++) {
      returnedBoards.push(new Board(null, this.solvedPuzzle.length))
    }
    let currentIndex = 0;
    for (let value = 1; value < size+1; value++) {
      if (!checkColumn(minChildrenRow, minChildrenColumn, value, this.solvedPuzzle) && 
          !checkRow(minChildrenRow, minChildrenColumn, value, this.solvedPuzzle) && 
          !checkSubsqare(minChildrenRow, minChildrenColumn, value, this.solvedPuzzle)) {
        const childBoard = cloneBoard(this.solvedPuzzle);
        childBoard.solvedPuzzle[minChildrenRow][minChildrenColumn] = String(value);
        returnedBoards[currentIndex] = childBoard;
        currentIndex ++;
      }
    }
    return returnedBoards;
  }
  return null;
}

Board.prototype.isFull = function() {
  const puzzle = this.solvedPuzzle;
  if (!puzzle) { return false; }
  for (let r=0; r<puzzle.length; r++) {
    for (let c=0; c<puzzle.length; c++) {
      const value = parseInt(puzzle[r][c], 10)
      if (!value || value > puzzle.length) { return false; }
    }
  }
  return true;
}

Board.prototype.isValidState = function() {
  const puzzle = this.solvedPuzzle;
  if (!puzzle) { return false; }
  for (let r=0; r<puzzle.length; r++) {
    for (let c=0; c<puzzle.length; c++) {
      const value = parseInt(puzzle[r][c], 10);
      if (value > 0 && value <= puzzle.length) {
        if (checkRow(r, c, value, puzzle)) { return false; }
        if (checkColumn(r, c, value, puzzle)) { return false; }
        if (checkSubsqare(r, c, value, puzzle)) { return false; }
      }
    } 
  }
  return true;
}

function cloneBoard(puzzle) {
  const clone = PUZZLE(puzzle.length)
  for(let row=0; row<puzzle.length; row++){
      for(let col=0; col<puzzle.length; col++){
          clone[row][col] = puzzle[row][col];
      }
  }
  return new Board(clone, clone.length);
}

function checkRow(r, c, value, puzzle) {
  for (let i=0; i<puzzle.length; i++) {
    if (i !== c && puzzle[r][i] === String(value)) return true;
  }
  return false;
}

function checkColumn(r, c, value, puzzle) {
  for (let i=0; i<puzzle.length; i++) {
    if (i !== r && puzzle[i][c] === String(value)) return true;
  }
  return false;
}

function checkSubsqare(r, c, value, puzzle) {
  if (puzzle.length === 4) {
    const x = Math.floor(r/2);
    const y = Math.floor(c/2);
    for (let i=x*2; i<x*2+2; i++) {
      for (let j=y*2; j<y*2+2; j++) {
        if ((i !== r && j !== c) && puzzle[i][j] === String(value)) return true;
      }
    }
    return false;
  } else if (puzzle.length === 9) {
    const x = Math.floor(r/3);
    const y = Math.floor(c/3);
    for (let i=x*3; i<x*3+3; i++) {
      for (let j=y*3; j<y*3+3; j++) {
        if ((i !== r && j !== c) && puzzle[i][j] === String(value)) return true;
      }
    }
    return false;
  } else {
    return false
  }
}

function checkBoard(puzzle) {
  if (!puzzle)   return false;
  const size = puzzle.length;
  if ( size !== 4 && size !== 6 && size !== 9) return false;
  for (let r=0; r<size; r++) {
    if (puzzle[r].length !== size) return false;
  }
  return true;
}
