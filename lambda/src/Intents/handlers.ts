import {BienvenidaIntentHandler} from "./Bienvenida";
import { Buscar_DispositivoIntentHandler } from "./Buscar_dispositivo";
import { EnviarResetIntentHandler } from "./Enviar_reset";
import { GenerarTicketIntentHandler } from "./Generar_ticket";


export var handlers: any ={
    Validar_correo: BienvenidaIntentHandler,
    Buscar_dispositivo: Buscar_DispositivoIntentHandler,
    Enviar_reset: EnviarResetIntentHandler,
    Generar_ticket: GenerarTicketIntentHandler,
}
