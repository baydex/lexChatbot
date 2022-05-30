"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BienvenidaIntentHandler = void 0;
const response_templates_1 = require("../response_templates");
class BienvenidaIntentHandler {
    Handle(event) {
        let result = (0, response_templates_1.base_template)(event);
        event = (0, response_templates_1.save_sessionAttributes)(event);
        result.sessionState.sessionAttributes = event.sessionState.sessionAttributes;
        if (!event.sessionState.sessionAttributes.Guardar_correo) {
            result = (0, response_templates_1.elicit_slot)(result, "Guardar_correo");
            return result;
        }
        var email = event.sessionState.sessionAttributes.Guardar_correo.slice(15);
        var msj = (0, response_templates_1.Validar_correo)(email);
        console.log("correo:", JSON.stringify(msj));
        if (msj.valid == true) {
            result = (0, response_templates_1.elicit_intent)(result, "Buscar_dispositivo", msj.msj);
        }
        else {
            result = (0, response_templates_1.elicit_slot)(result, "Guardar_correo");
            console.log("correo: no valido");
        }
        return result;
    }
}
exports.BienvenidaIntentHandler = BienvenidaIntentHandler;
//# sourceMappingURL=Bienvenida.js.map