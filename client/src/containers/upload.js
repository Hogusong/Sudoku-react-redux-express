import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { configUpload, uploadPuzzle } from '../actions';
import { BackGround, P4x4, P6x6, P9x9, IsValidInput } from '../global';

import '../css/upload.css';
import AppHeader from '../components/app-header';
import Introduction from '../components/introduction';
import BoardPicture from '../components/board-picture';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {  size: '',    puzzle: null,  
                    level: '',   uploading: false  }
    this.saveConfig = this.saveConfig.bind(this);
    this.uploadPuzzle = this.uploadPuzzle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  uploadPuzzle() {
    const username = this.props.user.username;
    console.log('username :', username)
    const type = this.state.level + '_' + this.state.size;
    this.props.uploadPuzzle(username, type, this.state.puzzle);
    this.setState({ uploading: false })
  }

  saveConfig() {
    if (this.allChecked() && !this.state.uploading) {
      const config = {
        size: this.state.size,
        level: this.state.level
      }
      this.props.configUpload(config)
      const puzzle =  (this.state.size==='4x4') ? P4x4 :
                      (this.state.size==='6x6') ? P6x6 : P9x9 ;
      this.setState({ puzzle: puzzle,
                      uploading: !this.state.uploading })
      console.log(config)
    } 
  }

  allChecked() {
    if (!this.state.size) {
      alert('Board size is missing ...');
      return false;
    } else if (!this.state.level) {
      alert('Game level is missing ...');
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.props.configUpload(null)
  }

  handleChange(e, i, j) {
    const puzzle = this.state.puzzle;
    if (IsValidInput(e.target.value, puzzle.length)) {
      puzzle[i][j] = e.target.value;
      this.setState({ puzzle: puzzle });
    }

  }

  renderGrid() {
    const grids = [];
    const size = parseInt(this.props.config.size[0],10);
    for (let i=0; i<size; i++) {
      for (let j=0; j<size; j++){
        const input = <input id={`${i}x${j}`} type='text'  
          style={{background:`${BackGround(i,j,size)}`}}
          key={`${i}x${j}`} value={this.state.puzzle[i][j]}
          onChange={(e)=>this.handleChange(e,i,j)} />
        grids.push(input);
      }
    }
    const name = 'grid-' + size;
    return  <div className="upload-game">
              <h3>Enter a new Puzzle to upload. 
                  (Level : {this.props.config.level})</h3>
              <div id={name}>{grids}</div>  
            </div>
  }

  showHelp(){
    console.log('pressed for Help')
  }

  render() {
    console.log('in Upload :', this.props.user, this.props.config);
    const mainBoard = (this.props.config) ? this.renderGrid() : <BoardPicture /> ;
    return (
      <div>
        <AppHeader />
        <div className="upload-body">
          <Introduction />
          <div className="upload-main">
            {mainBoard}
            <div className="upload-config">
              <h3 style={{color: 'orchid'}}>Set Upload Options :</h3>
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
              <div className="buttons">
                <button onClick={()=> this.saveConfig()}
                      id="save-btn">Save Config</button>
                <button onClick={()=> this.uploadPuzzle()}
                      id="upload-btn">Upload Puzzle</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user,  config: state.upload_config  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ configUpload, uploadPuzzle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
