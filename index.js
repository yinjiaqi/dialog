
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
// Basic card

app.intent('basic card', (conv) => {

  if (!conv.hasScreen) {

    conv.ask('Sorry, try this on a screen device or select the ' +

      'phone surface in the simulator.');

    return;

  }

  conv.ask('This is the first simple response for a basic card.');

  conv.ask(new Suggestions(intentSuggestions));

  // Create a basic card

  conv.ask(new BasicCard({

    text: `This is a basic card.  Text in a basic card can include "quotes" and

    most other unicode characters including emoji 📱.  Basic cards also support

    some markdown formatting like *emphasis* or _italics_, **strong** or

    __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other

    things like line  \nbreaks`, // Note the two spaces before '\n' required for

                                 // a line break to be rendered in the card.

    subtitle: 'This is a subtitle',

    title: 'Title: this is a title',

    buttons: new Button({

      title: 'This is a button',

      url: 'https://assistant.google.com/',

    }),

    image: new Image({

      url: IMG_URL_AOG,

      alt: 'Image alternate text',

    }),

  }));

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
