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
 *  User: "Alexa, ask Frog Facts for a frog fact"
 *  Alexa: "Here's your frog fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.15f794ad-f300-4bc4-a6c3-bfb9ac05393a";

/**
 * Array containing space facts.
 */
var FROG_MAN = [
    "One gram of the toxin produced by the skin of the golden poison dart frog could kill 100,000 people.",
    "A frog completely sheds its skin about once a week.",
    "A group of birds is called a flock, a group of cattle is called a herd, but a group of frogs is called an army.",
    "The glass frog has translucent skin, so you can see its internal organs, bones and muscles through its skin.",
    "There is a frog in Indonesia that has no lungs – it breathes entirely through its skin.",
    "The waxy monkey frog secretes a wax from its neck and uses its legs to rub that wax all over its body. The wax prevents the skin of the frog from drying out in sunlight.",
    "The biggest frog in the world is the Goliath frog. It lives in West Africa and can measure more than a foot in length and weigh more than 7 pounds – as much as a newborn baby.",
    "There’s a type of poison dart frog called the blue-jeans frog; it has a red body with blue legs. It is also sometimes called the strawberry dart frog.",
    "The red-eyed tree frog lays it eggs on the underside of leaves that hang over water. When the eggs hatch, the tadpoles fall into the water below.",
    "Frogs absorb water through their skin so they don't need to drink.",
    "Frogs can lay as many as 4,000 eggs in frogspawn.",
    "The eyes and nose of a frog are on top of its head so it can breathe and see when most of its body is under the water.",
    "Frogs have long back legs and webbed feet for jumping and swimming.",
    "The world's biggest frog is the goliath frog from Cameroon in West Africa. Their body can be one-foot long.",
    "The smallest frogs in the world are less than half-an-inch long.",
    "In the Seychelles, there is a male frog that carries its young around on its back until they become adults.",
    "People who study frogs and toads are called herpetologists. Herpetology is the study of amphibians and reptiles.",
    "Frog bones form a new ring every year when the frog is hibernating, just like trees do. Scientists can count these rings to discover the age of the frog.",
    "Because frogs come out in the rain, people used to think that they fell to earth in the rain! And in nineteenth century England, people tried catching them to prove it.",
    "One type of desert frog can wait as long as seven years for water by surrounding itself in a type of transparent bag that becomes its first meal once the rain comes.",
    "Amphibians' eyes come in all shapes and sizes. Some even have square or heart shaped pupils. But amphibians don't see color -- they only see in black or white.",
    "The golden dart frog is the most poisonous frog on earth and the skin of one frog could kill up to 1,000 people.",
    "In recent years, a painkiller with 200 times the power of morphine has been found in the skin of a frog.",
    "The male Darwins Frog takes its mate's eggs into its mouth as soon as they show signs of life and they stay there until they emerge as fully grown froglets.",
    "Frogs cannot live in the sea or any salt water.",
    "There are more than 4,000 types of amphibians in the world, but Europe has very few--only 45 species.",
    "Many of the most brightly colored tropical frogs are colored in this way to warn predators that they are poisonous.",
    "Certain frogs can jump up to 20 times their own body length in a single leap."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * FrogFactMan is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var FrogMan = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
FrogMan.prototype = Object.create(AlexaSkill.prototype);
FrogMan.prototype.constructor = FrogMan;

FrogMan.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("FrogMan onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

FrogMan.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("FrogMan onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
FrogMan.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("FrogMan onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

FrogMan.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask frog facts tell me a frog fact, or, you can say exit... What can I help you with?", "What can I help you with?");
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
    var factIndex = Math.floor(Math.random() * FROG_MAN.length);
    var fact = FROG_MAN[factIndex];

    // Create speech output
    var speechOutput = "Here's your frog fact: " + fact;

    response.tellWithCard(speechOutput, "FrogMan", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the FrogMan skill.
    var frogMan = new FrogMan();
    frogMan.execute(event, context);
};

