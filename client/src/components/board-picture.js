import React, { Component } from 'react';

class BoardPicture extends Component {
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

  render() {
    return (
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
  )}  
}

export default BoardPicture;