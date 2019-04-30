import React, { Component } from 'react';
import MenuHook from './components/Menu/MenuHook';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import './App.scss';

/* eslint-disable react/prefer-stateless-function, react/jsx-filename-extension */
class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    document.removeEventListener('resize', this.handleResize());
  }

  handleResize = () => {
    if (document.documentElement.clientWidth < 641) {
      this.setState({
        windowSize: 'small',
      });
    } else {
      this.setState({
        windowSize: 'big',
      });
    }
  }

  render() {
    const { windowSize } = this.state;
    return (
      <div className="App">
        <MenuHook windowSize={windowSize} />
        <Content />
        <Footer windowSize={windowSize} />
      </div>
    );
  }
}

export default App;
