const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const events = require('../src/events.json');
let app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {    
  res.header("Access-Control-Allow-Origin", "*");    
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');   
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");    
  return next(); 
  }
); 


// //Static file declaration
// app.use(express.static(path.join(__dirname, 'build')));

// //production mode
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'build')));
//   //
//   app.get('*', (req, res) => {
//     res.sendfile(path.join(__dirname = 'build/index.html'));
//   })
// }

// //build mode
// app.get('/events', (req, res) => {
//   // res.sendFile(path.join(__dirname+'/../public/index.html'));
//   res.send('Success!');
// })
app.get('/events', function (req, res) {
	console.log('DATA:', events.data);
  		res.sendStatus(200);
  	  res.send('Success!');
});

let port = process.env.PORT || 4000;

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})


