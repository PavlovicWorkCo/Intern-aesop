import React, { Component } from 'react';
import MenuBar from './components/MenuBar/MenuBar';
import './App.scss';

/* eslint-disable react/prefer-stateless-function, react/jsx-filename-extension */
class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar />
      </div>
    );
  }
}

export default App;
