"use strict";
exports.__esModule = true;
var aws_sdk_1 = require("aws-sdk");
var readline = require("readline");
// import * as ll from 'aws-sdk'
function gen_id() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
var botAlias = "TSTALIASID";
var userId = gen_id();
var botName = "Smart_Reset";
var botAliasId = "TSTALIASID";
var botId = "KPIYFAOETK";
var localeId = "es_419";
var sessionId = gen_id();
var configParams = {
    region: "us-east-1",
    secretAccessKey: "W7x3sbIK+gM5F+RkcH+ejwYG4HCpBJ6H0zjLBcpL",
    accessKeyId: "AKIA3MTEMVIDOFLR7LEL",
    params: {
        botAlias: botAlias,
        botName: botName,
        userId: userId
    }
};
var lexruntime = new aws_sdk_1.LexRuntimeV2(configParams);
var sessionState = {};
function callback(err, data) {
    if (data) {
        console.log("Bot: ", data.messages[0].content);
        var message_1 = "";
        var rl_1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl_1.question('User: ', function (answer) {
            message_1 = answer;
            rl_1.close();
            enviar_mensaje(message_1);
        });
    }
    else {
        console.log("error ", err);
    }
}
var paramsText = {
    botAliasId: botAliasId,
    botId: botId,
    localeId: localeId,
    sessionId: sessionId,
    text: ""
};
function enviar_mensaje(message) {
    paramsText.text = message;
    lexruntime.recognizeText(paramsText, callback);
}
enviar_mensaje("inicio");
