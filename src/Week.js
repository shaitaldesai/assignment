import React from 'react';
import './App.css';

const Week = ({ weekArr, eventsObject }) => {
 
  const findAllEventsForDay = (day) => {
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
      {weekArr.map(day => (
        <div className={day === '' ? 'greyBox' : 'box'} >
          {day === '' ? null : day}
          <div>{findAllEventsForDay(day)}</div>
        </div> 
      ))}
    </div>)
}

export default Week;
