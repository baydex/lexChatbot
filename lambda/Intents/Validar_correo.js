"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validar_correoIntentHandler = void 0;
const response_templates_1 = require("../response_templates");
class Validar_correoIntentHandler {
    Handle(event) {
        let result = (0, response_templates_1.base_template)(event);
        event = (0, response_templates_1.save_sessionAttributes)(event);
        result.sessionState.sessionAttributes = event.sessionState.sessionAttributes;
        var email = event.sessionState.sessionAttributes.Guardar_correo.slice(11);
        var msj = (0, response_templates_1.Validar_correo)(email);
        //console.log(Validar_correo(email))
        (0, response_templates_1.Mandar_mensaje)(result, msj);
        return result;
    }
}
exports.Validar_correoIntentHandler = Validar_correoIntentHandler;
//# sourceMappingURL=Validar_correo.js.map