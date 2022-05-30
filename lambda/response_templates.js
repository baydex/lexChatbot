"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generar_ticket = exports.Mandar_mensaje = exports.Validar_tiempo = exports.Validar_alias = exports.Validar_correo = exports.change_intent = exports.save_sessionAttributes = exports.elicit_intent = exports.elicit_slot = exports.base_template = void 0;
const intents_1 = require("./intents");
function base_template(event) {
    return {
        sessionState: {
            intent: event.sessionState.intent,
            dialogAction: {
                type: "Delegate"
            },
        }
    };
}
exports.base_template = base_template;
;
function elicit_slot(template, slot) {
    template.sessionState.dialogAction.type = "ElicitSlot";
    template.sessionState.dialogAction.slotToElicit = slot;
    return template;
}
exports.elicit_slot = elicit_slot;
function elicit_intent(template, intent, message) {
    template.sessionState.dialogAction.type = "ElicitIntent";
    template.sessionState.intent.name = intent;
    template.messages = [{
            contentType: "PlainText",
            content: message
        }];
    return template;
}
exports.elicit_intent = elicit_intent;
function save_sessionAttributes(event) {
    var slots_box = event.sessionState.intent.slots;
    Object.keys(slots_box).forEach(key => {
        if (slots_box[key]) {
            event.sessionState.sessionAttributes[key] = event.sessionState.intent.name + "_" + slots_box[key].value.interpretedValue;
        }
    });
    return event;
}
exports.save_sessionAttributes = save_sessionAttributes;
function change_intent(template, intent, slot) {
    template.sessionState.intent.name = intent;
    template = elicit_slot(template, slot);
    template.sessionState.intent.slots = intents_1.intents[intent];
    return template;
}
exports.change_intent = change_intent;
function Validar_correo(correo) {
    var msj = "";
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var resultado = expReg.test(correo);
    let result = {
        msj: msj,
        valid: false
    };
    if (resultado === true) {
        result.msj = "¡Perfecto, muchas gracias!. Dime, ¿En qué puedo ayudarte? ";
        console.log("good");
        result.valid = true;
    }
    else {
        result.msj = "El correo no existe favor de verificarlo";
        console.log("comeme la pinga");
    }
    return result;
}
exports.Validar_correo = Validar_correo;
function Validar_alias(alias) {
    var msj = "";
    var datos = {
        Id: 123456,
        Alias: "Equipo001",
        Carrier: 2,
        Tdesconexion: 10
    };
    let result = {
        msj: msj,
        valid: false,
        datos: datos
    };
    if (alias != datos.Alias) {
        result.msj = "No, " + alias + "Ingresa el dispositivo correcto, por favor";
        result.valid = false;
    }
    else {
        result.valid = true;
        result.msj = "Claro, enviaremos un reset a tu dispositivo, " + alias + " para corregir el incidente.";
    }
    return result;
}
exports.Validar_alias = Validar_alias;
function Validar_tiempo(tiempo) {
    var msj = "";
    if (tiempo > 10) {
        msj = "Reset";
    }
    else {
        msj = "Kill";
    }
    return msj;
}
exports.Validar_tiempo = Validar_tiempo;
function Mandar_mensaje(template, message) {
    template.messages = [{
            contentType: "PlainText",
            content: message,
        }];
    template.sessionState.intent.state = "Fulfilled";
    template.sessionState.dialogAction.type = "Close";
    return template;
}
exports.Mandar_mensaje = Mandar_mensaje;
function Generar_ticket() {
    var msj = "Ok en un momento se generará la solicitud del reporte, espera un momento por favor.";
    var ticket = "154XDF";
    let result = {
        msj: msj,
        ticket: ticket
    };
    return result;
}
exports.Generar_ticket = Generar_ticket;
//# sourceMappingURL=response_templates.js.map