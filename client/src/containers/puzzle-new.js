import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/puzzle-new.css';
import { BackGround } from '../global';
import AppHeader from '../components/app-header';
import Introduction from '../components/introduction';

class PuzzleNew extends Component {
  renderGrid() {
    const grids = [];
    const size = parseInt(this.props.user.config.size[0],10);
    for (let i=0; i<size; i++) {
      for (let j=0; j<size; j++){
        const input = <input id={`${i}x${j}`} type='text'  
          style={{background:`${BackGround(i,j,size)}`}}
          key={`${i}x${j}`} />
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
    console.log('in puzzle:', this.props.user)
    const configDetail = (!this.props.user) ? 
        <div id='detail'>Need to set config</div> :
        <div id='detail'>
          <label>Game Level :</label><p>{this.props.user.config.level}</p>
          <label>Puzzle No. :</label><p>12345 ({this.props.user.config.choice})</p>
          <label>Hint count :</label><p>{this.props.user.config.hint}</p>
          <label>Time count :</label><p>{this.props.user.config.time_count}</p>
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
  return { user: state.user }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ configUser }, dispatch);
// }

export default connect(mapStateToProps)(PuzzleNew);
