import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { configUser } from '../actions';
import '../css/config.css';
import AppHeader from '../components/app-header';
import Introduction from '../components/introduction';
import BoardPicture from '../components/board-picture';

class UserConfig extends Component {
  constructor(props) {
    super(props);
    this.state = { size: '',  level: '',    choice: '',   
                  time_count: '',      hint:''  }
    this.saveConfig = this.saveConfig.bind(this);
  }

  saveConfig() {
    if (this.allChecked()) {
      const config = {
        size: this.state.size,
        level: this.state.level,
        choice: this.state.choice,
        time_count: this.state.time_count,
        hint: this.state.hint      
      }
      console.log('saved ...', config);
      this.props.configUser(this.props.user.username, config)
      document.getElementById('saved').style.display='block';
    }
  }

  allChecked() {
    if (!this.state.size) {
      alert('Board size is missing ...');
      return false;
    } else if (!this.state.level) {
      alert('Game level is missing ...');
      return false;
    } else if (!this.state.choice) {
      alert('Puzzle selection is missing ... ');
      return false;
    } else if (!this.state.time_count) {
      alert('Time count option is missing ...');
      return false;
    }
    return true;
  }

  componentDidMount() {
    const config = this.props.user.config;
    if (!this.state.size) {
      this.setState({
        size: config.size,
        level: config.level,
        choice: config.choice,
        puzzle_no: config.puzzle_no,
        time_count: config.time_count,
        hint: config.hint
      })
      if (config.size) {
        document.getElementById('size'+config.size).defaultChecked = true;
        document.getElementById(config.level).defaultChecked = true;
        document.getElementById(config.choice).defaultChecked = true;  
        document.getElementById(config.time_count).defaultChecked = true;
      }
    }
    console.log(config);
  }

  render() {
    console.log('render config', this.props.user, this.state);
    return (
      <div>
        <AppHeader />
        <div className="config-body">
          <Introduction />
          <div className="config-main">
            <BoardPicture />
            <div className="user-config">
              <h3 style={{color: 'orchid'}}>Set Game Config :</h3>
              <div className="board-size">
                <h3>Board Size</h3>
                <div className="size-select">
                  <input type='radio' id='size4x4' name="board-size" 
                    value="4x4" onClick={()=>this.setState({ size: '4x4' })} />
                  <label>4 x 4</label>
                  <input type='radio' id='size6x6' name="board-size" 
                    value="6x6" onClick={()=>this.setState({ size: '6x6' })} />
                  <label>6 x 6</label>
                  <input type='radio' id='size9x9' name="board-size" 
                    value="9x9" onClick={()=>this.setState({ size: '9x9' })} />
                  <label>9 x 9</label>
                </div>
              </div>
              <div className="game-level">
                <h3>Game Level</h3>
                <div className="level-select">
                  <input type="radio" id="easy" name="level" value="easy" 
                        onClick={()=>this.setState({ level: 'easy' })} />
                  <label>Easy</label>
                  <input type="radio" id="medium" name="level" value="medium" 
                        onClick={()=>this.setState({ level: 'medium' })} />
                  <label>Medium</label>
                  <input type="radio" id="hard" name="level" value="hard" 
                        onClick={()=>this.setState({ level: 'hard' })} />
                  <label>Hard</label>
                  <input type="radio" id="expert" name="level" value="expert"
                        onClick={()=>this.setState({ level: 'expert' })} />
                  <label>Expert</label>
                </div>
              </div>
              <div className="puzzle-id">
                <h3>Puzzle Selection</h3>
                <div className="puzzle-select">
                  <input type="radio" id="random" name="no-option" value="random" 
                        onClick={()=>this.setState({ choice: 'random' })} />
                  <label>Random</label>
                  <input type="radio" id="choose" name="no-option" value="choose" 
                        onClick={()=>this.setState({ choice: 'choose' })} />
                  <label>Choose</label>
                </div>
              </div>
              <div className="others">
                <h3>Other options</h3>
                <label>How many hint(s) : 
                  <input type="number" min="0" value={this.state.hint}
                        onChange={(e)=>this.setState({ hint: e.target.value })} />
                </label>
                <div className="time-count">
                  <p>Time count :
                    <input type="radio" id="yes" name="time" value="yes" 
                          onClick={()=>this.setState({ time_count: 'yes' })} />
                    <label>Yes</label>
                    <input type="radio" id="no" name="time" value="no" 
                          onClick={()=>this.setState({ time_count: 'no' })} />
                    <label>No</label>
                  </p>
                </div>
              </div>
              <div>
                <button onClick={()=> this.saveConfig()}
                      id="submit-btn">Save Config</button>
                <p id="saved">Saved your config!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ configUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConfig);
