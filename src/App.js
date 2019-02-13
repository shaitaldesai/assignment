import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentDate: 0
    }
  }

  render() {
    return (
      <div className='wrapper'>
      <div className='bar'> 
      </div>
      <div className='row' >
      </div>
      </div>
    );
  }
}

export default App;



