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
 *  User: "Alexa, ask insect facts for a insect fact"
 *  Alexa: "Here's your insect fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.9725cd37-61c9-45d7-b5f6-66dc1769ef44"

/**
 * Array containing space facts.
 */
var INSECT_FACTS = [
    "At least two thirds of all living species on the Earth are spiders and insects.",
    "The Earth's biomass, which is the weight of all living animals, is mostly made up of insects and spiders. They far outnumber all the mammals on the Earth put together.",
    "It has been estimated that there are 10,000,000,000,000,000,000 insects on the Earth - that is 1.5 billion insects for every person.",
    "There are around 4000 species of mammals known to science and a few new species are described each year. Over 1,000,000 species of insects have been identified with around 1000 new species discovered each year.",
    "The number of insect species is believed to be between six and ten million.",
    "Insect bodies have three parts, the thorax, abdomen and head.",
    "Insects have three pairs of legs.",
    "Some insects, such as gerridae (water striders), are able to walk on the surface of water.",
    "Bees, termites and ants live in well organized social colonies.",
    "Only male crickets chirp.",
    "Insects are cold blooded.",
    "Silkworms are used as the primary producer of silk.",
    "Most insects hatch from eggs.",
    "Some cicadas can make sounds nearly 120 decibels loud.",
    "The life cycle of a mosquito features four stages, egg, larva, pupa and adult.  Female mosquitoes drink blood in order to obtain nutrients needed to produce eggs.",
    "Spiders are not insects.",
    "Bees are found on every continent except Antarctica.",
    "Ants leave trails and communicate with each other using pheromones as chemical signals.",
    "The raft spider is the largest spider in Britain.",
    "The golden orb-web spider spins the largest of all orb weaver spider webs, and is believed to make the strongest silk.",
    "An Australian tiger beetle is probably the world’s fastest running insect",
    "Ladybugs can eat as many as 5,000 aphids in its lifetime, which makes them a gardeners best friend.",
    "One of the most dangerous scorpions in the deathstalker scorpion, which lives in Africa and the Middle East."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * InsectFactMan is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var InsectMan = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
InsectMan.prototype = Object.create(AlexaSkill.prototype);
InsectMan.prototype.constructor = InsectMan;

InsectMan.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("InsectMan onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

InsectMan.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("InsectMan onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
InsectMan.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("InsectMan onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

InsectMan.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Insect Facts tell me a insect fact, or, you can say exit... What can I help you with?", "What can I help you with?");
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
    // Get a random space fact from the insect facts list
    var factIndex = Math.floor(Math.random() * INSECT_FACTS.length);
    var fact = INSECT_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your insect fact: " + fact;

    response.tellWithCard(speechOutput, "InsectMan", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the InsectMan skill.
    var insectMan = new InsectMan();
    insectMan.execute(event, context);
};

