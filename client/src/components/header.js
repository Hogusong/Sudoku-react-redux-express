import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions';

import logo from '../img/logo.svg';
import SignIn from '../containers/signin';
import LogIn from '../containers/login';

class Header extends Component {
  openSignIn() {
    document.getElementById('modal-signin').style.display='block';
  }

  openLogIn() {
    document.getElementById('modal-login').style.display='block';
  }

  render() {
    const logger = (this.props.user) ? 
        <div id="logger">
          <a onClick={this.props.logoutUser}>Log out</a>
        </div> :
        <div id="logger">
          <a onClick={this.openLogIn}>Log in</a> / 
          <a onClick={this.openSignIn}>Sign in</a>
       </div> 
      
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <h1 className="App-title">
              Welcome <span>{(this.props.user) ? this.props.user.username : ''}</span> to Sudoku
            </h1>
            { logger }
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


