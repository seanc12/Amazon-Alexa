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
 *  User: "Alexa, ask Fish Facts for a fish fact"
 *  Alexa: "Here's your fish fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.ffe3b988-5a2f-464b-8e69-6930d2b61657"

/**
 * Array containing fish facts.
 */
var FISH_FACTS = [
    "Fish have been on the earth for more than 450 million years.",
    "Fish were well established long before dinosaurs roamed the earth.",
    "There are over 25,000 identified species of fish on the earth.",
    "It is estimated that there may still be over 15,000 fish species that have not yet been identified.",
    "There are more species of fish than all the species of amphibians, reptiles, birds and mammals combined.",
    "40% of all fish species inhabit fresh water, yet less than .01% of the earth's water is fresh water.",
    "The spotted climbing perch is able to absorb oxygen from the air and will crawl overland using its strong pectoral fins.",
    "Some fish like sharks don't posses an air bladder to help keep them afloat and must either swim continually or rest on the bottom.",
    "Some fish make sounds by grating their teeth and others like some catfish make sounds from their air filled swim bladder.",
    "Some species of fish can fly (glide), others can skip along the surface and others can even climb rock.",
    "Fish have a specialized sense organ called the lateral line which works much like radar and helps them navigate in dark or murky water.",
    "The largest fish is the great whale shark which can reach fifty feet in length.",
    "The smallest fish is the Philippine goby that is less than 1/3 of an inch when fully grown.",
    "Some species of fish have skeletons made only of cartilage.",
    "Fish have excellent senses of sight, touch, taste and many possess a good sense of smell and 'hearing'.",
    "Fish feel pain and suffer stress just like mammals and birds.",
    "Tropical fish are one of the most popular pets in the U.S.",
    "95% of tropical fish mortality results from improper housing and nutrition.",
    "Many tropical fish sold in the United States are harvested from the wild in Africa, Asia, and Central and South America.",
    "Catfish have over 27,000 taste buds. Humans have around 7,000.",
    "Electric eels and electric rays have enough electricity to paralyze a horse.",
    "The most poisonous fish in the world is the stone fish. Its sting can cause shock, paralysis, and even death if not treated within a few hours.",
    "Angelfish are intelligent and can recognise their owners"
];
/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * FishFactsMan is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var FishFacts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
FishFacts.prototype = Object.create(AlexaSkill.prototype);
FishFacts.prototype.constructor = FishFacts;

FishFacts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("FishFacts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

FishFacts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("FishFacts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
FishFacts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("FishFacts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

FishFacts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Fish Facts tell me a fish fact, or, you can say exit... What can I help you with?", "What can I help you with?");
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
    var factIndex = Math.floor(Math.random() * FISH_FACTS.length);
    var fact = FISH_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fish fact: " + fact;

    response.tellWithCard(speechOutput, "FishFacts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the FishFacts skill.
    var fishFact = new FishFacts();
    fishFact.execute(event, context);
};

