"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buscar_DispositivoIntentHandler = void 0;
const response_templates_1 = require("../response_templates");
class Buscar_DispositivoIntentHandler {
    Handle(event) {
        let result = (0, response_templates_1.base_template)(event);
        if (!event.sessionState.sessionAttributes.Guardar_correo) {
            result = (0, response_templates_1.change_intent)(result, "Validar_correo", "Guardar_correo");
            return result;
        }
        event = (0, response_templates_1.save_sessionAttributes)(event);
        result.sessionState.sessionAttributes = event.sessionState.sessionAttributes;
        var atributos = result.sessionState.sessionAttributes;
        if (!atributos.Alias) {
            result = (0, response_templates_1.elicit_slot)(result, "Alias");
            return result;
        }
        var alias = "";
        alias = (atributos.Error != null) ? atributos.Error : atributos.Alias;
        alias = alias.slice(19);
        var validar = (0, response_templates_1.Validar_alias)(alias);
        console.log("ARREGLO", validar.datos.Tdesconexion);
        if (validar.valid == true) {
            result = (0, response_templates_1.change_intent)(result, "Enviar_reset", "Verificar");
        }
        else {
            result = (0, response_templates_1.elicit_slot)(result, "Error");
            atributos.Alias = atributos.Error;
        }
        return result;
    }
}
exports.Buscar_DispositivoIntentHandler = Buscar_DispositivoIntentHandler;
//# sourceMappingURL=Buscar_dispositivo.js.map