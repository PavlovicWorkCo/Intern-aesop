import React, { Component } from 'react';
import FakeLink from './components/FakeLink/FakeLink';
import './App.scss';

/* eslint-disable react/prefer-stateless-function, react/jsx-filename-extension */
class App extends Component {
  render() {
    return (
      <div className="App">
        <FakeLink href="/#menu" className="Link-test" text="test-link" />
      </div>
    );
  }
}

export default App;
