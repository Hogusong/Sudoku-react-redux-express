import React, { Component } from 'react';
import { connect } from 'react-redux';

class PuzzleConfig extends Component {
  saveConfig() {
    console.log('saved ...', this.props.user);
  }

  render() {
    return (
      <div className="puzzle-config">
        <div className="board-size">
          <h3>Board Size</h3>
          <div className="size-select">
            <input type='radio' id='size4' name="board-size" 
              value="4x4" />
            <label>4 x 4</label>
            <input type='radio' id='size6' name="board-size" 
              value="6x6" />
            <label>6 x 6</label>
            <input type='radio' id='size9' name="board-size" 
              value="9x9" />
            <label>9 x 9</label>
          </div>
        </div>
        <div className="game-level">
          <h3>Game Level</h3>
          <div className="level-select">
            <input type="radio" id="easy" name="level" value="Easy" />
            <label>Easy</label>
            <input type="radio" id="medium" name="level" value="Medium" />
            <label>Medium</label>
            <input type="radio" id="advenced" name="level" value="Advenced" />
            <label>Advenced</label>
            <input type="radio" id="hard" name="level" value="Hard" />
            <label>Hard</label>
          </div>
        </div>
        <div className="puzzle-id">
          <h3>Puzzle Selection</h3>
          <div className="puzzle-select">
            <input type="radio" id="random" name="no-option" />
            <label>Random</label>
            <input type="radio" id="chose" name="no-option" />
            <label>Choose</label>
          </div>
        </div>
        <div className="others">
          <h3>Other options</h3>
          <label>How many hint(s) : <input type="number" min="0" placeholder="0" /></label>
          <div className="time-count">
            <p>Time count :
              <input type="radio" id="yes" name="time" />
              <label>Yes</label>
              <input type="radio" id="no" name="time" />
              <label>No</label>
            </p>
          </div>
        </div>
        <button id="start-game" 
          onClick={( )=> this.saveConfig()}>
          Start Game</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ loginUser }, dispatch);
// }

export default connect(mapStateToProps)(PuzzleConfig);
