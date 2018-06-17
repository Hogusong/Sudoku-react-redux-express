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
    this.state = { answer: [],  occupied: [],  wrong: 0,
                   puzzle_no: '',  hint: 0 }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    // if (this.props.user.config.choice === 'random') {
      this.props.fetchRandom(this.props.user);
    // }
  } 

  componentWillReceiveProps(nextProps) {
    if(nextProps.puzzle_info.puzzle) {
      const { puzzle, puzzle_no } = nextProps.puzzle_info;
      const answer = GetSolution(puzzle).solvedPuzzle;
      console.log('answer:', answer)
      const occupied = [];
      for (let r=0; r<puzzle.length; r++) {
        const row = []
        for (let c=0; c<puzzle.length; c++) {
          if(puzzle[r][c] !== '') row.push(true);
          else row.push(false);
        }
        occupied.push(row);
      }
      const seconds = Math.floor((new Date()).getTime()/1000);
      const time = (new Date()).toString().split(' ')[4];
      this.setState({ puzzle, answer, occupied, puzzle_no, 
                      hint: this.props.user.config.hint,
                      start_time: time,
                      by_seconds: seconds })    
    }
  }

  handleChange(e, i, j) {
    const puzzle = this.state.puzzle;
    if (!this.state.occupied[i][j] && 
          IsValidInput(e.target.value, puzzle.length, 9999)) {
      puzzle[i][j] = e.target.value;
      this.setState({ puzzle: puzzle });
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
                <button id='check'>Check Status</button>
                <button id='clear'>Clear Wrong</button>
                <button id='hint'>One Hint</button>
                <button id='solve'>Solution</button>
                <button id='restart'>Start Again</button>
                <button id='save'>Save Game</button>            
                <button id='new'>New Game</button>            
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, puzzle_info: state.puzzle_info }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRandom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleNew);
