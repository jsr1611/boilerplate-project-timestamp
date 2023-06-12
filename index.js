// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api", function(req, res){
  let date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
})

app.get("/api/:date", function(req, res){
  let unix = new Date().getTime();
  let data = req.params.date;
  let test;
  if(data.includes("-") && data.length === 10){
      test = new Date(data);  
      unix = test.getTime();
      data = test.toUTCString();
    res.json({unix: unix, utc: data});
  }
  else if((data - 0) == data && (''+data).trim().length > 0){
    unix = Number(data);
    data = new Date(Number(data)).toUTCString();
    res.json({unix: unix, utc: data});
  }
  else{
    test = new Date(data);
    if(test == 'Invalid Date'){
      res.json({error: 'Invalid Date'});
    }
    else{
      unix = test.getTime();
      data = test.toUTCString();
    res.json({unix: unix, utc: data});
    }
  }
});



// listen for requests :)
var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
