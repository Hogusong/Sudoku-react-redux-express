import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Introduction from './introduction';
import '../css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { }
    this.background = this.background.bind(this);
    this.startPuzzle = this.startPuzzle.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  background(x,y,z) {
    let color = 'rgb(233, 240, 240)';
    color = "whitesmoke";
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

  renderGrid(z) {
    const grids = [];
    for (let i=0; i<z; i++) {
      for (let j=0; j<z; j++){
        const value = (Math.random()*10 > 6) ? Math.floor(Math.random()*z)+1 : '';
        const input = <input key={`${z}-${i}x${j}`} type='text'  
          style={{background:`${this.background(i,j,z)}`}}
          placeholder={`${value}`}/>
        grids.push(input);
      }
    }
    return grids;
  }

  startPuzzle() {
    console.log('Enjoy the puzzle', this.state)
  }

  updateState() {
    console.log('render', this.props.user);
    const config = this.props.user.config
    this.setState({ size: config.size,
                    level: config.level,
                    choice: config.choice,
                    puzzle_no: config.puzzle_no,
                    hint: config.hint,
                    time_count: config.time_count })
  }

  render() {
    return (
      <div className="main-home-body">
        <Introduction />
        <div className="home-main">
          <div className="home-game">
            <div className="puzzle-grid-four">
              {this.renderGrid(4)}
              <p>4 x 4</p>
            </div>
            <div className="puzzle-grid-six">
              {this.renderGrid(6)}
              <p>6 x 6</p>
            </div>
            <div className="puzzle-grid-nine">
              {this.renderGrid(9)}
              <p>9 x 9</p>
            </div>
          </div>
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
              <input type="number" id="number" min="1" placeholder="Enter number" />
            </div>
            <div className="others">
              <h3>Other options</h3>
              <label>How many hint(s) : <input type="number" min="0" /></label>
              <div className="time-count">
                <p>Time count :
                  <input type="radio" id="yes" name="time" />
                  <label>Yes</label>
                  <input type="radio" id="no" name="time" />
                  <label>No</label>
                </p>
              </div>
            </div>
            <button onClick={()=>this.startPuzzle()} id="start-game">Start Game</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Home);

