import React, { Component } from 'react';
import { BackGround } from '../Global';
import '../css/board-picture.css';

class BoardPicture extends Component {
  renderGrid(z) {
    const grids = [];
    for (let i=0; i<z; i++) {
      for (let j=0; j<z; j++){
        const value = (Math.random()*10 > 6) ? Math.floor(Math.random()*z)+1 : '';
        const input = <input key={`${z}-${i}x${j}`} type='text'  
          style={{background:`${BackGround(i,j,z)}`}}
          placeholder={`${value}`}/>
        grids.push(input);
      }
    }
    return grids;
  }
 
  render() {
    return (
      <div className="puzzle-grids">
        <div className="small-grid-4">
          {this.renderGrid(4)}
          <p>4 x 4</p>
        </div>
        <div className="small-grid-6">
          {this.renderGrid(6)}
          <p>6 x 6</p>
        </div>
        <div className="small-grid-9">
          {this.renderGrid(9)}
          <p>9 x 9</p>
        </div>
      </div>
  )}  
}

export default BoardPicture;