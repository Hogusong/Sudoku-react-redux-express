import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRandom } from '../actions';

import '../css/puzzle-new.css';
import { BackGround, GetSolution, IsValidInput } from '../Global';
import AppHeader from '../components/app-header';
import Introduction from '../components/introduction';

class PuzzleNew extends Component {
  constructor(props) {
    super(props);
    this.state = { checkedStatus: true, hint: 0 }
    this.handleChange = this.handleChange.bind(this);
    this.oneHint = this.oneHint.bind(this);
  }

  componentWillMount() {
    // if (this.props.user.config.choice === 'random') {
      this.props.fetchRandom(this.props.user);
    // }
  } 

  componentWillReceiveProps(nextProps) {
    if(nextProps.puzzle_info) {
      const { puzzle, puzzle_no } = nextProps.puzzle_info;
      const answer = GetSolution(puzzle).solvedPuzzle;
      this.setState({ answer });
      this.initialize(puzzle, puzzle_no, answer)
    }
  }

  initialize(origin, puzzle_no, answer) {
    const occupied = [];
    const puzzle = [];
    for (let r=0; r<origin.length; r++) {
      const row = []
      const puzzleRow = [];
      for (let c=0; c<origin.length; c++) {
        puzzleRow[c] = origin[r][c];
        if(origin[r][c] !== '') row.push(true);
        else row.push(false);
      }
      occupied.push(row);
      puzzle.push(puzzleRow);
    }
    const hint = this.props.user.config.hint;
    const seconds = Math.floor((new Date()).getTime()/1000);
    const time = (new Date()).toString().split(' ')[4];
    this.setState({ puzzle, occupied, puzzle_no, hint: 0,
                    wrong: 0,    start_time: time,
                    seconds: seconds,
                    checkedStatus: true })    
    for (let i=0; i<hint; i++) {
      this.oneHint(puzzle, occupied, answer, i+1)
    }
  }

  handleChange(e, r, c) {
    const puzzle = this.state.puzzle;
    if (!this.state.occupied[r][c] && 
          IsValidInput(e.target.value, puzzle.length, 9999)) {
      puzzle[r][c] = e.target.value;
      this.setState({ puzzle: puzzle,  checkedStatus: false });
      document.getElementById(`${r}x${c}`).style.color = 'blue';
    }
  }

  renderGrid() {
    const grids = [];
    const size = parseInt(this.props.user.config.size[0],10);
    for (let i=0; i<size; i++) {
      for (let j=0; j<size; j++){
        const input = <input id={`${i}x${j}`} type='text'  
          style={{background:`${BackGround(i,j,size)}`}}
          key={`${i}x${j}`} value={(this.state.puzzle) ? (this.state.puzzle[i][j]) : null }
          onChange={(e)=>this.handleChange(e,i,j)} />
        grids.push(input);
      }
    }
    if (size===4) {  return <div id='grid-4'>{grids}</div>  }
    if (size===6) {  return <div id='grid-6'>{grids}</div>  }
    if (size===9) {  return <div id='grid-9'>{grids}</div>  }
  }

  showHelp(){
    console.log('pressed for Help')
  }

  checkStatus() {
    var wrong = 0
    const puzzle = this.state.puzzle;
    const answer = this.state.answer;
    const occupied = this.state.occupied;
    for (let r=0; r<occupied.length; r++) {
      for (let c=0; c<occupied.length; c++) {
        if (!occupied[r][c]) {
          const value = parseInt(puzzle[r][c],10);
          if (value && value <= occupied.length) {
            if (answer[r][c] === puzzle[r][c]) {
              occupied[r][c] = true;
            } else {
              wrong ++;
              document.getElementById(`${r}x${c}`).style.color = 'red';
            }
          }
        }
      }
    }
    this.setState({ occupied, checkedStatus: true,
                    wrong: this.state.wrong + wrong })
    if (isFull(occupied)) {
      const seconds = Math.floor((new Date()).getTime()/1000);
      this.props.postSolved({ username: this.props.user.username, 
                                puzzle_no: this.state.puzzle_no,
                                hint: this.state.hint, 
                                wrong: this.state.wrong,
                                type: this.props.puzzle_info.type,
                                seconds: seconds - this.state.seconds  })
      alert('You did good job...')
    }
  }

  clearWrong() {
    if (this.state.checkedStatus) {
      const puzzle = this.state.puzzle;
      const occupied = this.state.occupied;
      for (let r=0; r<occupied.length; r++) {
        for (let c=0; c<occupied.length; c++) {
          if (occupied[r][c]) {
            document.getElementById(`${r}x${c}`).style.color = 'black';
          } else {
            puzzle[r][c] = '';
          }
        }
      }
      this.setState({ puzzle })
    } else {
      alert('You can clear all wrong answers after you check status.')
    }
  }

  oneHint(puz=null, occ=null, ans=null, ht=null) {
    if (this.state.checkedStatus) {
      const answer = (ans) ? ans : this.state.answer ;
      const puzzle = (puz) ? puz : this.state.puzzle ;
      const occupied = (occ) ? occ : this.state.occupied ;
      console.log('ht', ht)
      console.log('hint', this.state.hint)
      const hint = (ht) ? ht : this.state.hint+1 ;
      console.log('hint', hint)
      while (!isFull(occupied)) {
        const row = Math.floor(Math.random()*answer.length) ;
        const col = Math.floor(Math.random()*answer.length) ;
        if (!occupied[row][col]) {
          occupied[row][col] = true;
          const id = `${row}x${col}`
          document.getElementById(id).style.color = 'blue';
          puzzle[row][col] = answer[row][col];
          this.setState({ puzzle, occupied, hint })
          return
        }
      }
    } else {
      alert('You can get a hint after you check status.')
    }
  }

  showAnswer() {
    const puzzle = this.state.puzzle;
    const occupied = this.state.occupied;
    const answer = this.state.answer;
    for (let r=0; r<occupied.length; r++) {
      for (let c=0; c<occupied.length; c++) {
        puzzle[r][c] = answer[r][c];
        occupied[r][c] = true;
        document.getElementById(`${r}x${c}`).style.color = 'black';        
      }
    }
    this.setState({ puzzle, occupied })  
  }

  restart() {
    const { puzzle, puzzle_no } = this.props.puzzle_info;
    this.initialize(puzzle, puzzle_no, this.state.answer)
  }

  saveGame() {

  }

  newGame() {
    this.props.fetchRandom(this.props.user);
  }

  render() {
    console.log('in render:', this.props.puzzle_info, this.state.answer)
    const configDetail = (!this.props.user) ? 
        <div id='detail'>Need to set config</div> :
        <div id='detail'>
          <label>Game Level :</label><p>{this.props.user.config.level}</p>
          <label>Puzzle No. :</label><p>{this.state.puzzle_no} ({this.props.user.config.choice})</p>
          <label>Time count :</label><p>{this.props.user.config.time_count}</p>
          <label>Hint count :</label><p>{this.state.hint}</p>
          <label>Start Time :</label><p>{this.state.start_time}</p>
          <label>Wrong answ :</label><p>{this.state.wrong}</p>
        </div> ;
    return (
      <div id="abc">
        <AppHeader />
        <div className="puzzle-body">
          <Introduction />
          <div className="puzzle-main">
            <div className="puzzle-game">
              <div>
                <h3>Game Detail</h3>
                {configDetail}
              </div>
              {this.renderGrid()}
              <div className="puzzle-help">
                <a onClick={this.showHelp}>Press to get HELP</a>
              </div>
            </div>
            <div className="puzzle-btns">
              <h3>Play Options :</h3>
              <div className="buttons">
                <button onClick={this.checkStatus.bind(this)}
                    id='check'>Check Status</button>
                <button onClick={this.clearWrong.bind(this)}
                    id='clear'>Clear Wrong</button>
                <button onClick={()=>this.oneHint()}
                    id='hint'>One Hint</button>
                <button onClick={this.showAnswer.bind(this)}
                    id='solve'>Solution</button>
                <button onClick={this.restart.bind(this)}
                    id='restart'>Start Again</button>
                <button onClick={this.saveGame.bind(this)}
                    id='save'>Save Game</button>            
                <button onClick={this.newGame.bind(this)}
                    id='new'>New Game</button>            
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function isFull(arr) {
  for (let r=0; r<arr.length; r++) {
    for (let c=0; c<arr.length; c++) {
      if (!arr[r][c]) return false;
    }
  }
  return true;
}

function mapStateToProps(state) {
  return { user: state.user, puzzle_info: state.puzzle_info }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRandom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleNew);
