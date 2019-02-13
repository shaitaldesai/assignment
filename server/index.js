const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + 'public'));
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});