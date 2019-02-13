const express = require('express');
const bodyParser = require('body-parser');
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

let port = process.env.PORT || 4000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});