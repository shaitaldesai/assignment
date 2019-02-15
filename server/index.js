const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const events = require('../src/events.json');
let app = express();

app.use(bodyParser.json());

// Static file declaration
app.use(express.static(path.join(__dirname, 'build')));

//build mode
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/../public/index.html'));
})

app.get('/events/:year?:month?', (req, res) => {
	console.log(req.query);
	 let eventsByMonth = events.data.filter(event => {
      return event.launch_date.slice(0, 4).toString() === req.query['year'] && event.launch_date.slice(5, 7).toString() === req.query['month'];
    });
  console.log('DATABYMONTH:', eventsByMonth);
  res.json(eventsByMonth);
})

const port = process.env.PORT || 4000;

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})


