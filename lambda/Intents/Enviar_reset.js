"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnviarResetIntentHandler = void 0;
const response_templates_1 = require("../response_templates");
class EnviarResetIntentHandler {
    Handle(event) {
        let result = (0, response_templates_1.base_template)(event);
        event = (0, response_templates_1.save_sessionAttributes)(event);
        result.sessionState.sessionAttributes = event.sessionState.sessionAttributes;
        var atributos = result.sessionState.sessionAttributes;
        if (!event.sessionState.sessionAttributes.Verificar) {
            result = (0, response_templates_1.elicit_slot)(result, "Verificar");
            return result;
        }
        var ver = (0, response_templates_1.Validar_alias)(event.sessionState.sessionAttributes.Alias);
        var tiempo = ver.datos.Tdesconexion;
        ver = ver.datos.Alias;
        var salir = true;
        var confirmar = event.sessionState.sessionAttributes.Verificar.slice(13);
        var estado = (0, response_templates_1.Validar_tiempo)(tiempo);
        if (event.sessionState.sessionAttributes.Verificar2 || estado == "Reset") {
            confirmar = (estado == "Reset") ? atributos.Verificar.slice(13) : atributos.Verificar2.slice(13);
            if (confirmar == "no") {
                result = (0, response_templates_1.Mandar_mensaje)(result, "Fue un placer ayudarte");
            }
            else {
                var ticket = (0, response_templates_1.Generar_ticket)();
                (0, response_templates_1.change_intent)(result, "Generar_ticket", "Final");
                ticket = (0, response_templates_1.Generar_ticket)();
                var destinatario = event.sessionState.sessionAttributes.Guardar_correo.slice(15);
                console.log("enviar correo", ticket.ticket, destinatario);
            }
        }
        if (estado == "Kill" && !event.sessionState.sessionAttributes.Verificar2) {
            if (confirmar == "no") {
                result = (0, response_templates_1.Mandar_mensaje)(result, "Fue un placer ayudarte");
            }
            else {
                result = (0, response_templates_1.elicit_slot)(result, "Verificar2");
            }
        }
        return result;
    }
}
exports.EnviarResetIntentHandler = EnviarResetIntentHandler;
//# sourceMappingURL=Enviar_reset.js.map