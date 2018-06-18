import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/game-options.css';
// import ConfigPuzzle from './config-puzzle';

class GameOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { checkConfig: false,
                   size: '',  level: '',    choice: '',   
                   time_count: '',      hint:''  }
    // this.gotoConfig = this.gotoConfig.bind(this);
  }

  // gotoConfig() {
  //   console.log('goto config', this.props.user)
  //   document.getElementById('menu-game').style.display='none';
  //   document.getElementById('config-puzzle').style.display='grid';
  //   this.setState({ checkConfig: true })
  // }

  // componentWillMount() {
  //   document.getElementById('config-puzzle').style.display='none';
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log("prev props", this.nextProps)
    // if (nextProps.user) {
    //   const config = nextProps.user.config;
    //   this.setState({ 
    //     size: config.size,  level: config.level,
    //     choice: config.choice,  hint: config.hint,
    //     time_count: config.time_count
    //   })
    // }
  // }

  render() {
    const config = this.props.user.config;
    console.log('game option', this.props.user.config)
    return (
      <div>
        <div id="menu-game" className="game-menu">
          <h3>Game Options</h3>
          <div className='config-detail'>
            <label>Size : </label><p>{config.size}</p>
            <label>Level : </label><p>{config.level}</p>
            <label>Puzzle: </label><p>{config.choice}</p>
            <label>Timer : </label><p>{config.time_count}</p>
            <label>Hint #: </label><p>{config.hint}</p>
          </div>
          <h3>What do you want :</h3>
          <div className="menu-btns">
            <Link to="/puzzle/new">New Game</Link>
            <Link to="/puzzle/saved">Open Saved</Link>
            <Link to="/upload">Upload Puzzle</Link>
            <Link to="/config">Change Config</Link>
            {/* <button onClick={this.gotoConfig}>Change Config</button> */}
          </div>
        </div>    
        {/* <ConfigPuzzle />   */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(GameOptions);
