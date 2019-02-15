import React, { Component } from 'react';
import moment from 'moment';
// import events from './events.json';
import Month from './Month.js';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTime: moment().format('llll'), // sample format: Tue, Feb 12, 2019 5:09 PM
      events: []
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
    this.getArrayOfWeeks = this.getArrayOfWeeks.bind(this);
    this.fetch = this.fetch.bind(this);
    this.months =  {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12};
    this.weekDays = {'Sun': 1, 'Mon': 2, 'Tue': 3, 'Wed': 4, 'Thu': 5, 'Fri': 6, 'Sat': 7};
  }

  componentDidMount () {
    console.log('MOUNTED!')
    let pathName = window.location.pathname;
    let url;
    let time;
    //determining url and currentTime for fetch function
    if (moment(pathName, "/YYYY/MM").format(pathName) === pathName) { 
      let year = pathName.split('/')[1];
      let month = pathName.split('/')[2];
      url = `/events?year=${year}&month=${month}`;  
      time = moment(pathName, "/YYYY/MM").format('llll');
    } else {
      url = `/events?year=${this.getYear()}&month=${this.getMonth()}`;
      // time = this.state.currentTime;
      time = moment().format('llll');
    }
    console.log('URL:', url);
    //
    this.fetch(url, events => {
      console.log('FETCH:', events);
      this.setState({
        currentTime: time,
        events: events
      });
      window.history.replaceState(null, null, `/${this.getYear()}/${this.getMonth()}`); 
      console.log('URL:', window.location);
    });
  }

  fetch (url, cb) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: (events) => {
        cb(events);
      },
      error: function (xhr, err) {
        console.log('err', err);
      }
    })
  }

  getCurrentTime (cb) {
    const currentTime = moment().format('llll');
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
      return `${month}`;
    }
  }

  getMonthStr () {
    return this.state.currentTime.slice(5, 8);
  }

  getYear () {
    return this.state.currentTime.split(' ')[3];
  }

  getDaysInMonth (year, month) {
    console.log('DAYSINMONTH:', new Date(year, month, 0).getDate());
    return new Date(year, month, 0).getDate();
  }

  monthDecrement () {
    let month = this.getMonth();
    let date = this.getDate();
    let year = this.getYear();
    let day = `${month}${date}${year}`;
    let currentState = moment(day, "MMDDYYYY").subtract(1, 'months').format('llll');
    this.setState({currentTime: currentState}, (prev, prop) => {
      console.log('PREV:', prev);
      $.ajax({
        url: `/events?year=${this.getYear()}&month=${this.getMonth()}`,
        type: 'GET',
        dataType: 'json',
        success: (events) => {
          this.setState({
            events: events
          })
          window.history.replaceState(null, null, `/${this.getYear()}/${this.getMonth()}`); 
          },
        error: function (xhr, err) {
          console.log('err', err);
        }
      })
    })
    console.log('After-DECREMENT:', currentState);
  }

  monthIncrement () {
    let month = this.getMonth();
    let date = this.getDate();
    let year = this.getYear();
    let day = `${month}${date}${year}`;
    let currentState = moment(day, "MMDDYYYY").add(1, 'months').format('llll');
    year = this.getYear();
    month = this.getMonth();
    this.setState({currentTime: currentState}, (prev, prop) => {
      console.log('PREV:', prev);
      $.ajax({
        url: `/events?year=${this.getYear()}&month=${this.getMonth()}`,
        type: 'GET',
        dataType: 'json',
        success: (events) => {
          this.setState({
            events: events
          })
          window.history.replaceState(null, null, `/${this.getYear()}/${this.getMonth()}`); 
        },
        error: function (xhr, err) {
          console.log('err', err);
        }
      })
    })
    console.log('After-INCREMENT:', currentState);
  }

  getFirstDayOfMonth () {
    let firstDay = moment(this.state.currentTime).startOf('month')._d.toString().slice(0, 3);
    return this.weekDays[firstDay];
  }

  getArrayOfWeeks () {
    let month = this.getMonth();
    let year = this.getYear();
    let firstDayOfMonth = this.getFirstDayOfMonth() - 1;
    console.log('YEAR:', year, 'MONTH:', month);
    let numberOfDaysInMonth = this.getDaysInMonth(year, month);
    let daysArr = [];
    for (var i = 0; i < numberOfDaysInMonth; i++) {
      daysArr[i] = i + 1;
    }
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArr.unshift('');
  }
    let weeksArr = [];
    while (daysArr.length > 7) {
      let arr = daysArr.splice(0, 7);
      weeksArr.push(arr);
    }
    if (daysArr.length > 0) {
      let arr = [];
      for (let i = 0; i < 7; i++) {
        if (daysArr[i]) {
          arr.push(daysArr[i]);
        } else {
          arr.push('');
        }
      }
      weeksArr.push(arr);
    }
    console.log('WEEKARRAY:', weeksArr);
    return weeksArr;    
  }

  render() {
    return (
      <div className='wrapper'>
          <div className='bar'> 
            <button className='button' onClick={() => this.monthDecrement()}>{'<'}</button> 
            <span>{this.getMonthStr() + ' ' + this.getYear()}</span> 
            <button className='button' onClick={() => this.monthIncrement()}>{'>'}</button> 
        </div>
        <Month arrOfWeeks={this.getArrayOfWeeks()} events={this.state.events} />
      </div>
    );
  }
}

export default App;



