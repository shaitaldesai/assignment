import React, { Component } from 'react';
import moment from 'moment';
import events from './events.json';
// import Week from './Week.js';
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
    this.monthDecrement = this.monthDecrement.bind(this);
    this.monthIncrement = this.monthIncrement.bind(this);
    this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this);
    this.months =  {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sept': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12};
    this.weekDays = {'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6};
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
    let month = this.months[monthStr];
    if (month < 10) {
      return `0${month}`;
    } else {
      return month;
    }
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

  monthDecrement () {
    var date = this.getMonth() + this.getDate() + this.getYear();
    let currentState = moment(date, "MMDDYYYY").subtract(1, 'months').format('llll');
    this.setState({
      currentTime: currentState
    })
    console.log('After-DECREMENT:', currentState);
  }

  monthIncrement () {
    var date = this.getMonth() + this.getDate() + this.getYear();
    let currentState = moment(date, "MMDDYYYY").add(1, 'months').format('llll');
    this.setState({
      currentTime: currentState
    })
    console.log('After-INCREMENT:', currentState);
  }

  getFirstDayOfMonth () {
    let firstDay = moment().startOf('month')._d.toString().slice(0, 3);
    return this.weekDays[firstDay];
  }

  render() {
      let currentDay = moment().format('llll');
      console.log('CURRENT:', currentDay);
      let daysInMonth = this.getDaysInMonth(this.getYear(), this.getMonth());
      console.log('DAYSINMONTH:', this.getYear(), this.getMonth(), daysInMonth);
      let date = this.getMonth() + this.getDate() + this.getYear();
      date = moment(date, "MMDDYYYY").subtract(1, 'months').format('llll');
      // date = moment(date, "MMDDYYYY").format('llll');
      console.log('DATE:', date);
    return (
      <div className='wrapper'>
        <div className='bar'> 
          <button onClick={() => this.monthDecrement()}>{'<'}</button> 
          <span>{`${this.getMonthStr()} ${this.getYear()}`}</span> 
          <button onClick={() => this.monthIncrement()}>{'>'}</button> 
        </div>
      </div>
    );
  }
}

export default App;



