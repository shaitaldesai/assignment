import React from 'react';
// import Week from './Week.js';
// import $ from 'jquery';
import './App.css';

const Month = ({ arrOfWeeks, events }) => {
//create an eventsObjectect with dates as keys, each key  pointing to an array of event titles
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

  const findEventsForDay = (day) => {
    let eventTitle;
    if (eventsObject.hasOwnProperty(day)) {
      eventTitle = eventsObject[day].map(data => {
        return data.title;
      });
    }
    if(eventTitle) {
      eventTitle = eventTitle.join(', ');
    }
    return eventTitle;
  };

  const findCellsToBePopulated = (day) => {
    if (day === '') {
      return null;
    } else {
      return day;
    }
  };
  
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
        <div className="row" key={week.toString()}>
          <div className={week[0] === '' ? 'greyBox' : 'box'}>
            {findCellsToBePopulated(week[0])}
            <div>{findEventsForDay(week[0])}</div>
          </div>
          <div className={week[1] === '' ? 'greyBox' : 'box'}>
            {findCellsToBePopulated(week[1])}
            <div>{findEventsForDay(week[1])}</div>
          </div>
          <div className={week[2] === '' ? 'greyBox' : 'box'}>
            {findCellsToBePopulated(week[2])}
            <div>{findEventsForDay(week[2])}</div>
          </div>
          <div className={week[3] === '' ? 'greyBox' : 'box'}>
            {findCellsToBePopulated(week[3])}
            <div>{findEventsForDay(week[3])}</div>
          </div>
          <div className={week[4] === '' ? 'greyBox' : 'box'}>
            {findCellsToBePopulated(week[4])}
            <div>{findEventsForDay(week[4])}</div>
          </div>
          <div className={week[5] === '' ? 'greyBox' : 'box'}>
            {findCellsToBePopulated(week[5])}
            <div>{findEventsForDay(week[5])}</div>
          </div>
          <div className={week[6] === '' ? 'greyBox' : 'box'}>
            {findCellsToBePopulated(week[6])}
            <div>{findEventsForDay(week[6])}</div>
          </div>
        </div>
      ))}
    </div>)
}

export default Month;

/**

        <Week weekArr={week} eventsObject={eventsObject} key={week.toString()} />


      {arrOfWeeks.map(wee
      k => (
        <div className="row" key={week.toString()}>
          <div className="one">
            {findCellsToBePopulated(week[0])}
            <div>{findEventsForDay(week[0])}</div>
          </div>
          <div className="two">
            {findCellsToBePopulated(week[1])}
            <div>{findEventsForDay(week[1])}</div>
          </div>
          <div className="three">
            {findCellsToBePopulated(week[2])}
            <div>{findEventsForDay(week[2])}</div>
          </div>
          <div className="four">
            {findCellsToBePopulated(week[3])}
            <div>{findEventsForDay(week[3])}</div>
          </div>
          <div className="five">
            {findCellsToBePopulated(week[4])}
            <div>{findEventsForDay(week[4])}</div>
          </div>
          <div className="six">
            {findCellsToBePopulated(week[5])}
            <div>{findEventsForDay(week[5])}</div>
          </div>
          <div className="seven">
            {findCellsToBePopulated(week[6])}
            <div>{findEventsForDay(week[6])}</div>
          </div>
        </div>
      ))}
  </div>) 


  **/

