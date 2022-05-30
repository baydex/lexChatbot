"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const close_Session_1 = require("./close_Session");
const moment = require("moment-timezone");
const handlers_1 = require("./Intents/handlers");
const response_templates_1 = require("./response_templates");
class index {
    handler(event, context, callback) {
        console.log(moment() + " Request = ", JSON.stringify(event));
        console.log(moment() + " Context = ", JSON.stringify(context));
        if (event.sessionState.sessionAttributes == null)
            event.sessionState.sessionAttributes = {};
        try {
            if (event.invocationSource === "DialogCodeHook") {
                console.log("event:" + JSON.stringify(event));
                var intent_name = event.sessionState.intent.name;
                var result;
                if (intent_name in handlers_1.handlers) {
                    var handler = handlers_1.handlers[intent_name];
                    result = new handler().Handle(event);
                }
                else {
                    result = (0, response_templates_1.base_template)(event);
                }
                callback(null, result);
            }
            else {
                //todo: codigo para fullfilment.
                result = (0, response_templates_1.base_template)(event);
                result = new handlers_1.handlers["Generar_ticket"]().Handle(event);
                console.log("INDEX");
                callback(null, result);
            }
        }
        catch (err) {
            console.log("error en validacion inicial: " + err);
            new close_Session_1.closing_session().closeSession(event, err, callback);
        }
    }
}
exports.handler = new index().handler;
//# sourceMappingURL=index.js.map