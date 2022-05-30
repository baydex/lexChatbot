"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closing_session = void 0;
class closing_session {
    closeSession(event, err, callback) {
        var msjs = [{
                contentType: "PlainText",
                content: "Se detecto un error y chat se cerrará."
            }];
        if (err)
            msjs.push({
                contentType: "PlainText",
                content: "Error: " + err
            });
        var closeResult = {
            sessionState: {
                sessionAttributes: event.sessionState.sessionAttributes,
                intent: {
                    state: "Fulfilled",
                    name: event.sessionState.intent.name
                },
                dialogAction: {
                    type: "Close",
                }
            },
            messages: msjs
        };
        callback(null, closeResult);
    }
}
exports.closing_session = closing_session;
//# sourceMappingURL=close_Session.js.map