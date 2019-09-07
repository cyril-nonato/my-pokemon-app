import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SearchReducer from './store/reducers/search';
import pokemonListReducer from './store/reducers/pokemonList';
import navigationReducer from './store/reducers/navigation';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const reducers = combineReducers({
  navigation: navigationReducer,
  search: SearchReducer,
  pokemonList: pokemonListReducer
});

const store = createStore(reducers , composeEnhancers(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
      <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
