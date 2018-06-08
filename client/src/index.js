import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

// import registerServiceWorker from './registerServiceWorker';
import Header from './components/header';
import Home from './components/home';
import Puzzle from './components/puzzle';
import './css/style.css';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-body">
          <Route exact path='/' component={Home} />
          <Route path='/puzzle' component={Puzzle} />
        </div>
        <footer>
          <span>G</span>od<span>B</span>less<span>U</span> Web Services &copy; 2018
        </footer>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

  // registerServiceWorker();
