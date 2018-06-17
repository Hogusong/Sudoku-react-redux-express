import Board from './Board';

export const Global = {
  name: null,
}

export const BackGround = (x,y,z) => {
  let color = "whitesmoke";
  if (z === 4) {
    if(x<2 && y<2) return color;
    if(x>1 && y>1) return color;
  } else if (z === 6) {
    if(x<2 && y<3) return color;
    if((x>1 && x<4) && y>2) return color;
    if(x>3 && y<3) return color;
  } else {
    if(x<3 && (y<3 || y>5)) return color;
    if((x>2 && x<6) && (y>2 && y<6)) return color;
    if(x>5 && (y<3 || y>5)) return color;
  }
  return 'white';
}

export const IsValidInput = (str, limit, max=limit) => {
  if (parseInt(str, 10) > max) return false ;
  for (let i=0; i<str.length; i++) {
    const value = parseInt(str[i],10)
    if (!value || value > limit) return false ;
  }
  return true ;
}

export const PUZZLE = function(x) {
  const puzzle = [];
  for (let i=0; i < x; i++) {
    const row = [];
    for (let j=0; j < x; j++) {
      row.push('');
    }
    puzzle.push(row)
  }
  return puzzle;
}

export const GetSolution = function(puzzle) {
  const board = new Board(puzzle, puzzle.length);
  const answer = getAnswer(board);
  return answer;
}

function getAnswer(board) {
  if (board.isFull() && board.isValidState()) {
    return board;    
  }
  const children = board.getChildren()
  if (children) {
    for (let i=0; i<children.length; i++) {
      const child = getAnswer(children[i])
      if (child) { return child; }
    }
  }
  return null;
}

export const IsEmpty = (puzzle) => {
  if (!puzzle) return true;
  for (let r=0; r<puzzle.length; r++) {
    for (let c=0; c<puzzle.length; c++) {
      if (puzzle[r][c] !== '') return false;
    }
  }
  return true;
}
