import React, { Component } from 'react';
import './App.css';
import Slider from './slider/Slider';

class App extends Component {
  constructor () {
    super()
    this.state = { name: '' }
  }
  render() {
    return (
      <div className="main">
      <Slider />
      </div>
    );
  }
}

export default App;
