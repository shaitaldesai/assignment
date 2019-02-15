import React from 'react';
import Week from './Week.js';
import './App.css';

const Month = ({ arrOfWeeks, events }) => {
//create an bject from array of events, with launch dates as keys for easy lookup for all the events for a day
  let eventsObject = {}; 
  events.forEach(event => {
    let date = event.launch_date.slice(8, 10);
    if (date.length === 2 && date[0] === '0') {
      date = date.slice(1);
    }
    if (! eventsObject.hasOwnProperty(date)) {
      let newArr = [];
      eventsObject[date] = newArr;
      eventsObject[date].push(event);
    } else {
      eventsObject[date].push(event);
    }
  });
  
  return (
    <div>
      <div className="row">
        <div className="two">{'Sun'}</div>
        <div className="two">{'Mon'}</div>
        <div className="two">{'Tue'}</div>
        <div className="two">{'Wed'}</div>
        <div className="two">{'Thu'}</div>
        <div className="two">{'Fri'}</div>
        <div className="two">{'Sat'}</div>
      </div>
      {arrOfWeeks.map(week => (
        <Week weekArr={week} eventsObject={eventsObject} key={week.toString()} />
      ))}
    </div>)
}

export default Month;


