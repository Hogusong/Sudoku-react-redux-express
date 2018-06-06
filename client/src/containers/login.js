import React, { Component } from 'react';

class LogIn extends Component {
  closeLogIn() {
    document.getElementById('modal-login').style.display='none';
  }

  accessLogIn() {
    document.getElementById('modal-login').style.display='none';
  }

  render() {
    return (
      <div id="modal-login" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span onClick={this.closeLogIn}>
                &times;</span>
            <h3>Log in Info.</h3>
          </div>
          <div className="modal-info">
            <label className="modal-label">Username or Email</label>
            <input className="modal-input" type="text" placeholder="Enter name or email" />
            <label className="modal-label">Password</label>
            <input className="modal-input" type="password" placeholder="Enter Password" />
            <button onClick={this.accessLogIn} className="modal-btn">Submit</button>
          </div>
        </div>    
      </div>
    )
  }
}

export default LogIn;

