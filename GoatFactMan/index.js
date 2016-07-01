/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask goat fact for a goat fact"
 *  Alexa: "Here's your goat fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.db431df1-b7a8-4c96-94a3-6b0ddc02e79f";

/**
 * Array containing goat facts.
 */
var GOAT = [
		"Most goats can be found in Asia and the Mid-East.",
    "Goats were the first animals to be used for milk by humans.",
    "There are over 210 breeds of goats in the world.",
    "There are approximately 450 million goats around the world.",
    "Goats were first brought to America by Columbus in 1493.",
    "Goats were regularly imported into America in the early 1900’s.",
    "The female goat is called a 'doe' or 'nanny.'",
    "The male goat is called a 'buck' or 'billy.'",
    "A castrated male goat is called a 'wether.'",
    "A baby goat is called a 'kid.'",
    "The act of giving birth is called 'kidding.'",
    "The doe can have 1 to 6 kids per litter, however, 4 to 6 kids are rare.",
    "Goats do not have teeth in their upper front jaw.",
    "Goats have 24 molars and 8 incisors.",
    "Both male and female goats can have beards.",
    "Normally goats have two teats and cows have four.",
    "Goats prefer browse over grass and grass to clover.",
    "Goats can be born with or without horns.",
    "Goats and sheep are seasonal breeders.",
    "Goats are bovines and are closely related to cows and antelopes.",
    "The breeding age for male goats is between 8-10 months.",
    "A mature, healthy male buck can breed 20 to 40 does.",
    "Goats were the first animals domesticated by man in 10,000 B.C."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * GoatFactMan is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var GoatMan = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
GoatMan.prototype = Object.create(AlexaSkill.prototype);
GoatMan.prototype.constructor = GoatMan;

GoatMan.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("GoatMan onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

GoatMan.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("GoatMan onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
GoatMan.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("GoatMan onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

GoatMan.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Goat Fact tell me a goat fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * GOAT.length);
    var fact = GOAT[factIndex];

    // Create speech output
    var speechOutput = "Here's your goat fact: " + fact;

    response.tellWithCard(speechOutput, "GoatMan", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the GoatMan skill.
    var spaceGeek = new GoatMan();
    spaceGeek.execute(event, context);
};

