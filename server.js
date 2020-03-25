// server.js

var express = require('express');
var app = express();

// CORS
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// STATIC
app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API WHO AM I
app.get("/api/whoami", function (req, res) {
  try{
      const software = req.headers["user-agent"]
      const language = req.headers["accept-language"]  
      const forwardedFor = req.headers["x-forwarded-for"].split(",")
      const ipaddress= forwardedFor[forwardedFor.length-1]
      res.json({language,software,ipaddress});
  }
  catch(error){
     res.json({error});
  }
});


// LISTEN
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
