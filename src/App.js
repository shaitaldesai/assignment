import React, { Component } from 'react';
import Month from './Month.js';
import './App.css';
import moment from 'moment';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTime: moment().format('llll'), // date format chosen: Tue, Feb 12, 2019 5:09 PM
      events: []
    }

    this.getCurrentDay = this.getCurrentDay.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getCurrentMonth = this.getCurrentMonth.bind(this);
    this.getCurrentMonthWord = this.getCurrentMonthWord.bind(this);
    this.getCurrentYear = this.getCurrentYear.bind(this);
    this.getTotalDaysInMonth = this.getTotalDaysInMonth.bind(this);
    this.monthDecrementClickHandler = this.monthDecrementClickHandler.bind(this);
    this.monthIncrementClickHandler = this.monthIncrementClickHandler.bind(this);
    this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this);
    this.getArrayOfWeeks = this.getArrayOfWeeks.bind(this);
    this.fetch = this.fetch.bind(this);
    this.months =  {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12};
    this.weekDays = {'Sun': 1, 'Mon': 2, 'Tue': 3, 'Wed': 4, 'Thu': 5, 'Fri': 6, 'Sat': 7};
  }

  componentDidMount () {
    //sets state for currentTime and events
    let url;
    let time;
    //determining url to use in fetch function; and currentTime to set the state
    //implementing url driven calendar, if there is date in address url bar then use it to set the state otherwise use current time to set the state
    let pathName = window.location.pathname;
    if (moment(pathName, "/YYYY/MM").format(pathName) === pathName) { 
      let year = pathName.split('/')[1];
      let month = pathName.split('/')[2];
      url = `/events?year=${year}&month=${month}`;  
      time = moment(pathName, "/YYYY/MM").format('llll');
    } else {
      url = `/events?year=${this.getCurrentYear()}&month=${this.getCurrentMonth()}`;
      time = moment().format('llll');
    }
    //
    this.fetch(url, events => {
      console.log('FETCH:', events);
      this.setState({
        currentTime: time,
        events: events
      });
      window.history.replaceState(null, null, `/${this.getCurrentYear()}/${this.getCurrentMonth()}`); 
      console.log('URL:', window.location);
    });
  }

  //fetching events json data from node server
  fetch (url, cb) {
    fetch(url)
    .then(events => {
      return events.json();
    })
    .then(jsonEvents => {
      cb(jsonEvents);
    })
  } 

  getCurrentDay () {
    return this.state.currentTime.slice(0, 3);
  }
 
  getDate () {
    return this.state.currentTime.slice(9, 11);
  }

  getCurrentMonth () {
    let monthStr = this.state.currentTime.slice(5, 8);
    let month = this.months[monthStr];
    if (month < 10) {
      return `0${month}`;
    } else {
      return `${month}`;
    }
  }

  getCurrentMonthWord () {
    return this.state.currentTime.slice(5, 8);
  }

  getCurrentYear () {
    return this.state.currentTime.split(' ')[3];
  }

  getTotalDaysInMonth (year, month) {
    console.log('DAYSINMONTH:', new Date(year, month, 0).getDate());
    return new Date(year, month, 0).getDate();
  }

  monthDecrementClickHandler () {
    let month = this.getCurrentMonth();
    let date = this.getDate();
    let year = this.getCurrentYear();
    let day = `${month}${date}${year}`;
    let currentState = moment(day, "MMDDYYYY").subtract(1, 'months').format('llll');
    this.setState({currentTime: currentState}, (prev, prop) => {

      fetch(`/events?year=${this.getCurrentYear()}&month=${this.getCurrentMonth()}`)
      .then(events => {
        return events.json();
      })
      .then(jsonEvents => {
        this.setState({
          events: jsonEvents
        })
        window.history.replaceState(null, null, `/${this.getCurrentYear()}/${this.getCurrentMonth()}`);       
      })
    })
  }

  monthIncrementClickHandler () {
    let month = this.getCurrentMonth();
    let date = this.getDate();
    let year = this.getCurrentYear();
    let day = `${month}${date}${year}`;
    let currentState = moment(day, "MMDDYYYY").add(1, 'months').format('llll');
    year = this.getCurrentYear();
    month = this.getCurrentMonth();
    this.setState({currentTime: currentState}, (prev, prop) => {
      fetch(`/events?year=${this.getCurrentYear()}&month=${this.getCurrentMonth()}`)
      .then(events => {
        return events.json();
      })
      .then(jsonEvents => {
        this.setState({
          events: jsonEvents
        })
        window.history.replaceState(null, null, `/${this.getCurrentYear()}/${this.getCurrentMonth()}`);       
      })
    })
  }

  //determining wich day of the week, the first day of the current month falls on
  getFirstDayOfMonth () {
    let firstDay = moment(this.state.currentTime).startOf('month')._d.toString().slice(0, 3);
    return this.weekDays[firstDay];
  }

  getArrayOfWeeks () {
    let month = this.getCurrentMonth();
    let year = this.getCurrentYear();
    let firstDayOfMonth = this.getFirstDayOfMonth() - 1;
    let numberOfDaysInMonth = this.getTotalDaysInMonth(year, month);
    let arrayOfDaysInMonth = [];
    let arrayOfWeeks = [];
    //populating arrayOfDaysInMonth
    for (var i = 0; i < numberOfDaysInMonth; i++) {
      arrayOfDaysInMonth[i] = i + 1;
    }
    //filling up leading spaces in month for months that do not start on Sunday
    for (let i = 0; i < firstDayOfMonth; i++) {
      arrayOfDaysInMonth.unshift('');
    }
    //iterating over arrayOfDaysInMonth to create arrayOfWeeks until number of days left in arrayOfDaysInMonth is less than seven days, then creating a new array by filling the extra spaces with empty string to make array of seven elements, then pushing this new array into arrayOfWeeks to finish the last array
    while (arrayOfDaysInMonth.length > 7) {
      let arr = arrayOfDaysInMonth.splice(0, 7);
      arrayOfWeeks.push(arr);
    }
    if (arrayOfDaysInMonth.length > 0) {
      let arr = [];
      for (let i = 0; i < 7; i++) {
        if (arrayOfDaysInMonth[i]) {
          arr.push(arrayOfDaysInMonth[i]);
        } else {
          arr.push('');
        }
      }
      arrayOfWeeks.push(arr);
    }
    return arrayOfWeeks;    
  }

  render() {
    return (
      <div className='wrapper'>
          <div className='bar'> 
            <button className='button' onClick={() => this.monthDecrementClickHandler()}>{'<'}</button> 
            <span>{this.getCurrentMonthWord() + ' ' + this.getCurrentYear()}</span> 
            <button className='button' onClick={() => this.monthIncrementClickHandler()}>{'>'}</button> 
        </div>
        <Month arrOfWeeks={this.getArrayOfWeeks()} events={this.state.events} />
      </div>
    );
  }
}

export default App;



