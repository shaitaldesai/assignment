import React from 'react';
import './App.css';

const Week = (props) => (
  <div>
  {props.weeksArr.map(week => (
    <div className='row'>
      <div className="one">{week[0]}</div>
      <div className="two">{week[1]}</div>
      <div className="three">{week[2]}</div>
      <div className="four">{week[3]}</div>
      <div className="five">{week[4]}</div>
      <div className="six">{week[5]}</div>
      <div className="seven">{week[6]}</div>
    </div>
  ))}
  </div>
)

export default Week;