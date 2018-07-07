"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

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
                        }
                    ]
                }
            }
        },
        source: "https://echo-webhook-dialogflow.herokuapp.com"
    });
});

conv.ask(new BasicCard({
text: `This is a basic card.`,
subtitle: 'This is a subtitle',
title: 'Title: this is a title',
buttons: new Button({
title: 'This is a button',
url: 'https://assistant.google.com/',
}),
}));
restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
