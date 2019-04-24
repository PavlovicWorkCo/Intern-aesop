import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import './App.scss';

/* eslint-disable react/jsx-filename-extension */
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
    if (document.documentElement.clientWidth < 651) {
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
        <Menu windowSize={windowSize} />
        <Content />
        <Footer windowSize={windowSize} />
      </div>
    );
  }
}

export default App;
