import React, { Component } from 'react';
import { connect } from 'react-redux';

import Introduction from './introduction';
import BoardPicture from './board-picture';
import ConfigPicture from './config-picture';
import PuzzleConfig from '../containers/puzzle-config';
import '../css/home.css';

class Home extends Component {
  render() {
    return (
      <div className="main-home-body">
        <Introduction />
        <div className="home-main">
          <BoardPicture />
          {(this.props.user) ? <PuzzleConfig /> : <ConfigPicture />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Home);


