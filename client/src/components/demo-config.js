import React, { Component } from 'react';

import '../css/config.css';

class DemoConfig extends Component {
  render() {
    return (
      <div className="user-config">
        <h3 style={{color: 'orchid'}}>Puzzle Config :</h3>
        <div className="board-size">
          <h3>Board Size</h3>
          <div className="size-select">
            <input type='radio' id='size4x4' name="board-size" 
              value="4x4" />
            <label>4 x 4</label>
            <input type='radio' id='size6x6' name="board-size" 
              value="6x6" />
            <label>6 x 6</label>
            <input type='radio' id='size9x9' name="board-size" 
              value="9x9" defaultChecked />
            <label>9 x 9</label>
          </div>
        </div>
        <div className="game-level">
          <h3>Game Level</h3>
          <div className="level-select">
            <input type="radio" id="easy" name="level" value="easy" defaultChecked />
            <label>Easy</label>
            <input type="radio" id="medium" name="level" value="medium" />
            <label>Medium</label>
            <input type="radio" id="hard" name="level" value="hard" />
            <label>Hard</label>
            <input type="radio" id="expert" name="level" value="expert" />
            <label>Expert</label>
          </div>
        </div>
        <div className="puzzle-id">
          <h3>Puzzle Selection</h3>
          <div className="puzzle-select">
            <input type="radio" id="random" name="no-option" defaultChecked />
            <label>Random</label>
            <input type="radio" id="choose" name="no-option" />
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
              <input type="radio" id="no" name="time" defaultChecked />
              <label>No</label>
            </p>
          </div>
        </div>
        <button id="submit-btn" 
          onClick={()=>alert('Would you log in first to enjoy the puzzle ... ?')}>
          Start Game</button>
      </div>
    )
  }
}

export default DemoConfig;
