import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Global } from '../global';
import { logoutUser } from '../actions';

import '../css/header.css';
import logo from '../img/logo.svg';
import SignIn from '../containers/signin';
import LogIn from '../containers/login';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  
  openSignIn() {
    document.getElementById('modal-start').style.display='block';
  }

  openLogIn() {
    document.getElementById('modal-login').style.display='block';
  }

  logOut() {
    this.props.logoutUser();
    document.getElementById('logout').style.display="none";
    document.getElementById('logger').style.display='block'
  }

  render() {
    if(Global.name) document.getElementById('logger').style.display='none';
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <h1 className="App-title">
              Welcome {(Global.name) ? Global.name : ''} to Sudoku
            </h1>
            <div id="logger">
              <a onClick={this.openLogIn}>Log in</a> / 
              <a onClick={this.openSignIn}>Sign in</a>
            </div> 
            <div id="logout">
              <a onClick={this.logOut} style={{float: "right"}}>Log out</a>
            </div>
          </div>
        </div>    
        <SignIn />
        <LogIn />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


