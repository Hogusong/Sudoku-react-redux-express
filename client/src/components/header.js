import React, { Component } from 'react';
import logo from '../img/logo.svg';
import SignIn from '../containers/signin';
import LogIn from '../containers/login';
import '../css/header.css';

class Header extends Component {
  openSignIn() {
    document.getElementById('modal-start').style.display='block';
  }

  openLogIn() {
    document.getElementById('modal-login').style.display='block';
  }

  render() {
    const loginUser = ""
    const logger = (!loginUser) ? 
      <p>
        <a onClick={this.openLogIn}>Log in</a> / 
        <a onClick={this.openSignIn}>Sign in</a>
      </p> : <p><a>Log out</a></p>

    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <h1 className="App-title">Welcome to Sudoku</h1>
            {logger}
          </div>
        </div>    
        <SignIn />
        <LogIn />
      </div>
    )
  }
}

export default Header;

