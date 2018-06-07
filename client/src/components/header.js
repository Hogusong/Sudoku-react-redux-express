import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions';

import logo from '../img/logo.svg';
import SignIn from '../containers/signin';
import LogIn from '../containers/login';
import '../css/header.css';

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
  }

  render() {
    const user = this.props.user;
    const logger = (!user) ? 
      <p>
        <a onClick={this.openLogIn}>Log in</a> / 
        <a onClick={this.openSignIn}>Sign in</a>
      </p> : 
      <p><a onClick={this.logOut} style={{float: "right"}}>Log out</a></p>

    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <h1 className="App-title">
              Welcome {(user) ? user.username : ''} to Sudoku</h1>
            {logger}
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


