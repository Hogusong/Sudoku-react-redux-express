import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';

class AppHeader extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1 className="App-title">
            Welcome <span>{(this.props.user) ? this.props.user.username : ''}</span> to Sudoku
          </h1>
          <div id="logger">
            <Link to="/">Previous Page</Link>
          </div>
        </div>
      </div>    
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(AppHeader);
