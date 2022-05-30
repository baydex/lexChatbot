"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerarTicketIntentHandler = void 0;
const response_templates_1 = require("../response_templates");
class GenerarTicketIntentHandler {
    Handle(event) {
        let result = (0, response_templates_1.base_template)(event);
        event = (0, response_templates_1.save_sessionAttributes)(event);
        result.sessionState.sessionAttributes = event.sessionState.sessionAttributes;
        console.log("MIRAME");
        if (!event.sessionState.sessionAttributes.Final) {
            console.log("MIRAME");
        }
        return result;
    }
}
exports.GenerarTicketIntentHandler = GenerarTicketIntentHandler;
//# sourceMappingURL=Generar_ticket.js.map