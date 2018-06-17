import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/home.css';
import Header from '../components/header';
import Introduction from '../components/introduction';
import BoardPicture from '../components/board-picture';
import DemoConfig from '../components/demo-config';
import GameOptions from './game-options';

class Home extends Component {
  render() {
    const renderDOM = (!this.props.user) ?  <DemoConfig /> : <GameOptions />;
    return (
      <div>
        <Header />
        <div className="home-body">
          <Introduction />
          <div className="home-main">
            <BoardPicture />
            {renderDOM}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Home);


