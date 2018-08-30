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
  con.query(qstring, function (err, result) {
    if (err) throw err;
    //var result2=JSON.stringify(result);
    var result2=tableify(result);
    console.log(result2);
  
    return res.json({
        fulfillmentText: speech,
        payload: {
            google: {
                expectUserResponse: true,
                richResponse: {
                    items: [
                        {
                            "basicCard": {
                               
                                "formattedText": " Your Query Input = "+ speech + "\n" +result2,
                                "image": {
                                    "url": "https://otb.cachefly.net/wp-content/uploads/2013/04/red-line.png",
                                    "accessibilityText": "Image alternate text"
                                },
                                "buttons": [
                                    {
                                        "title": "Read more",
                                        "openUrlAction": {
                                            "url": "https://example.google.com/mathandprimes"
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
