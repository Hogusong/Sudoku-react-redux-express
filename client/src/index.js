import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

// import registerServiceWorker from './registerServiceWorker';
import Header from './components/header';
import Home from './components/home';
import Options from './components/puzzle_config';
import Puzzle from './components/puzzle';
import './css/style.css';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <Header />
      <div className="main-body">
        <BrowserRouter>
          <Switch>
            <Route path='/options' component={Options} />
            <Route path='/puzzle' component={Puzzle} />
            <Route path='/' component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
      <footer>
        <span>G</span>od<span>B</span>less<span>U</span> Web Services &copy; 2018
      </footer>
    </div>
  </Provider>
  , document.getElementById('root'));

  // registerServiceWorker();
