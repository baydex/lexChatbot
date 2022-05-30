"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
const Bienvenida_1 = require("./Bienvenida");
const Buscar_dispositivo_1 = require("./Buscar_dispositivo");
const Enviar_reset_1 = require("./Enviar_reset");
const Generar_ticket_1 = require("./Generar_ticket");
exports.handlers = {
    Validar_correo: Bienvenida_1.BienvenidaIntentHandler,
    Buscar_dispositivo: Buscar_dispositivo_1.Buscar_DispositivoIntentHandler,
    Enviar_reset: Enviar_reset_1.EnviarResetIntentHandler,
    Generar_ticket: Generar_ticket_1.GenerarTicketIntentHandler,
};
//# sourceMappingURL=handlers.js.map