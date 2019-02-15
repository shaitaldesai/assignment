import React from 'react';
// import Day from './Day.js';
// import $ from 'jquery';
import './App.css';

const Week = ({ week, eventsObject }) => {
 
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

	return (
    <div className='row'>
      {week.map(day => (
        <div className='box'>
          {day === '' ? null : day}
          <div>{findEventsForDay(day)}</div>
        </div> 
      ))}
    </div>)
}

// export default Week;

/**
      
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
    </div>)

  **/