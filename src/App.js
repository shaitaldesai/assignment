import React, { Component } from 'react';
import moment from 'moment';
import events from './events.json';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTime: '',
      events: events.data
    }
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.getDay = this.getDay.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getMonth = this.getMonth.bind(this);
    this.getMonthStr = this.getMonthStr.bind(this);
    this.getYear = this.getYear.bind(this);
    this.getDaysInMonth = this.getDaysInMonth.bind(this);
    this.months =  {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sept': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12};
  }

  componentDidMount () {
    this.getCurrentTime((currentTime) => {
      this.setState({
        currentTime: currentTime
      });
    });
  }

  getCurrentTime (cb) {
    const currentTime = moment().format('llll');
      // Tue, Feb 12, 2019 5:09 PM
    cb(currentTime);
  }

  getDay () {
    return this.state.currentTime.slice(0, 3);
  }
 
  getDate () {
    return this.state.currentTime.slice(9, 11);
  }

  getMonth () {
    let monthStr = this.state.currentTime.slice(5, 8);
    return this.months[monthStr];
  }

    getMonthStr () {
    return this.state.currentTime.slice(5, 8);
  }

  getYear () {
    return this.state.currentTime.slice(13, 17);
  }

  getDaysInMonth (year, month) {

    return new Date(year, month, 0).getDate();
  }

  render() {
      let currentDay = moment().format('llll');
      console.log('CURRENT:', currentDay);
      let daysInMonth = this.getDaysInMonth(this.getYear(), this.getMonth());
      console.log('DAYSINMONTH:', this.getYear(), this.getMonth(), daysInMonth);
    return (
      <div className='wrapper'>
      <div className='bar'> 
      </div>
      <div className='row' >
      Hello!
      </div>
      </div>
    );
  }
}

export default App;



