// server.js
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

//return ip adress, language, software
app.get("/api/whoami", (req,res)=>{
res.json({
  ipaddress:"ip",
  language: "de-DE,de;q=0.9",
  software: "Mozilla/5.0  Chrome/95.0.4638.69 Safari/537.36 OPR/81.0.4196.60"
})
})


// return datum utc and unix 
const date = new Date()
app.get("/api/",(req,res)=>{
res.json({
  "unix":Date.now(),
  "utc":date.toUTCString()
})
})

app.get("/api/:date_string",(req,res)=>{
let input=req.params.date_string;

if(parseInt(input)>10000){
  let unixTime=new Date(parseInt(input))
  res.json({
    "unix":unixTime.getTime(),
    "utc":unixTime.toUTCString()
  })
}

let passedValue=new Date(input)

if(passedValue=="Invalid Date"){
  res.json({ error : "Invalid Date" })
}else{
  res.json({
    "unix":passedValue.getTime(),
    "utc":passedValue.toUTCString(),input
  })
}})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
