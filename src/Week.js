import React from 'react';
import './App.css';

const Week = ({ startOfMonth, arrOfWeeks }) => {
  let firstDayOfMonth = startOfMonth();
  let count = 0;
  let findCellsToBePopulated = (cellNumber) => {
    if (firstDayOfMonth > cellNumber || cellNumber === '') {
      return null;
    } else {
      count++;
      return count;
    }
  }
  return (
    <div>
      {arrOfWeeks.map(week => (
        <div className="row" key={week.toString()}>
          <div className="one">{findCellsToBePopulated(week[0])}</div>
          <div className="two">{findCellsToBePopulated(week[1])}</div>
          <div className="three">{findCellsToBePopulated(week[2])}</div>
          <div className="four">{findCellsToBePopulated(week[3])}</div>
          <div className="five">{findCellsToBePopulated(week[4])}</div>
          <div className="six">{findCellsToBePopulated(week[5])}</div>
          <div className="seven">{findCellsToBePopulated(week[6])}</div>
        </div>
      ))}
  </div>)
}

export default Week;