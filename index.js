"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();
const outside="I am outside ";
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12247448",
  password: "eVJ7Jfki2A",
database: "sql12247448"
});

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

  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM Employee where eid=1", function (err, result2) {
    if (err) throw err;
    
    console.log(result2);
  

    
    console.log('Incoming request body:', req.body);

        var speech =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.echoText
            ? req.body.queryResult.parameters.echoText
            : "Seems like some problem. Speak again.";

    console.log('speech:', speech);

    return res.json({
        fulfillmentText: speech,
        payload: {
            google: {
                expectUserResponse: true,
                richResponse: {
                    items: [
                        {
                            simpleResponse: {
                                textToSpeech: speech
                            }
                        },
                        {
                            "basicCard": {
                                "title": outside + speech,
                                "formattedText": " Your Query Input "+ speech +result2,
                                "image": {
                                    "url": "https://example.google.com/42.png",
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
