import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

// import registerServiceWorker from './registerServiceWorker';
import Home from './containers/home';
import PuzzleNew from './containers/puzzle-new';
import PuzzleSaved from './containers/puzzle-saved';
import Upload from './containers/upload';
import UserConfig from './containers/user-config';
import './css/index.css';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/puzzle/new' component={PuzzleNew} />
          <Route path='/puzzle/saved' component={PuzzleSaved} />
          <Route path='/config' component={UserConfig} />
          <Route path='/upload' component={Upload} />
        </div>
        <footer>
          <span>G</span>od<span>B</span>less<span>U</span> Web Services &copy; 2018
        </footer>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

  // registerServiceWorker();
