import React from 'react';
import $ from 'jquery';
import './App.css';

const Week = ({ startOfMonth, arrOfWeeks, events }) => {
  const findCellsToBePopulated = (week) => {
    if (week === '') {
      return null;
    } else {
      return week;
    }
  };

  let obj = {};

  events.forEach(event => {
    let date = event.launch_date.slice(8, 10);
    if (date.length === 2 && date[0] === '0') {
      date = date.slice(1);
    }
    if (! obj.hasOwnProperty(date)) {
      let newArr = [];
      obj[date] = newArr;
      obj[date].push(event);
    } else {
      obj[date].push(event);
    }
  });

  console.log('OBJ:', obj);
  console.log('ARROFWEEKS:', arrOfWeeks);

  const findEventsForDay = (day) => {
    let eventTitle;
    if (obj.hasOwnProperty(day)) {
      eventTitle = obj[day].map(data => {
        return data.title;
      });
    }
    if(eventTitle) {
      eventTitle = eventTitle.join(', ');
    }
    return eventTitle;
  };

  $("div.row > div > text:empty").css( "background", "grey" );

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
          <div className="one">
            {findCellsToBePopulated(week[0])}
            <div>{findEventsForDay(week[0])}</div>
          </div>
          <div className="one">
            {findCellsToBePopulated(week[1])}
            <div>{findEventsForDay(week[1])}</div>
          </div>
          <div className="one">
            {findCellsToBePopulated(week[2])}
            <div>{findEventsForDay(week[2])}</div>
          </div>
          <div className="one">
            {findCellsToBePopulated(week[3])}
            <div>{findEventsForDay(week[3])}</div>
          </div>
          <div className="one">
            {findCellsToBePopulated(week[4])}
            <div>{findEventsForDay(week[4])}</div>
          </div>
          <div className="one">
            {findCellsToBePopulated(week[5])}
            <div>{findEventsForDay(week[5])}</div>
          </div>
          <div className="one">
            {findCellsToBePopulated(week[6])}
            <div>{findEventsForDay(week[6])}</div>
          </div>
        </div>
      ))}
  </div>) 
}

export default Week;

/**
      {arrOfWeeks.map(week => (
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
  </div>) **/

