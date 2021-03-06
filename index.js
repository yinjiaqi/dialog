"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();
const outside="I am outside ";
var mysql = require('mysql');
const tableify = require('html-tableify');


var http=require('https');

http.get('https://jsonplaceholder.typicode.com/posts/1', function(res) {
  //console.log("Got response: " + res.statusCode);

  res.on("data", function(chunk) {
    //console.log("body"+chunk);
var result1="body"+chunk;
console.log(result1);




restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());

restService.get("/", function (req, res) {
    return res.send('Hello from Echo sample!');
});


restService.post("/echo", function(req, res) {

 
  

    
    console.log('Incoming request body:', req.body);

        var speech =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.echoText
            ? req.body.queryResult.parameters.echoText
            : "1";

    console.log('speech:', speech);
 var qstring=speech;
  var con = mysql.createConnection({
  host: "db4free.net",
  user: "sql12247448",
  password: "eVJ7Jfki2A",
database: "sql12247448"
});
  con.connect(function(err) {
  if (err) throw err;
  con.query(qstring,function (err, result) {
    if (err) throw err;
    //var result2=JSON.stringify(result);
    var result2=tableify(result);
    console.log(result2);
  
    return res.json({
       // fulfillmentText: speech,
        payload: {
            google: {
                expectUserResponse: true,
                richResponse: {
                    items: [
                        {
                            simpleResponse: {
                              
                                textToSpeech:'the result is below'
                            }
                        },
                        {
                            "basicCard": {
                             //   "title": outside + speech,
                                "formattedText": result2,
                                "image": {
                                    "url": "http://img.duob.cn/FileUploads/2016-7-7/1467876808.jpg",
                                    "accessibilityText": "Image alternate text"
                                },
                                "buttons": [
                                    {
                                        "title": "Read more",
                                        "openUrlAction": {
                                            "url": "http://www.w3school.com.cn/sql/index.asp"
                                        }
                                    }
                                ],
                                "imageDisplayOptions": "CROPPED"
                            }
                        }     
                    ]
                }
            }
        },
        source: "https://echo-webhook-dialogflow.herokuapp.com"
    });
});  }); }); });
});

     restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
