import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavAppBar from './containers/NavAppBar';
// import logo from './logo.svg';
// import './App.css';
import Auth from './containers/Auth';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';

import reducer from './containers/store/reducers/reducer';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer, composeEnhancer(applyMiddleware(thunk)),
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavAppBar />
        <div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Auth />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}


export default App;
