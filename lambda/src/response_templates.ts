import { LexV2Event, LexV2Result } from "aws-lambda/trigger/lex-v2";
import { intents } from "./intents";
export function base_template (event: LexV2Event): LexV2Result{
        return {
            sessionState: {
                intent: event.sessionState.intent,
                dialogAction: {
                    type: "Delegate"

                },
                
            }
        }
    };

export function elicit_slot (template: LexV2Result, slot: string): LexV2Result{
    template.sessionState.dialogAction.type = "ElicitSlot"
    template.sessionState.dialogAction.slotToElicit = slot
    return template
}

export function elicit_intent (template: LexV2Result, intent: string, message: string): LexV2Result{
    template.sessionState.dialogAction.type = "ElicitIntent"
    template.sessionState.intent.name = intent
    
    template.messages = [{
        contentType: "PlainText",
        content: message
    }]
    return template
}

export function save_sessionAttributes(event: LexV2Event): LexV2Event {
    var slots_box = event.sessionState.intent.slots

        Object.keys(slots_box).forEach(key=>{
            if(slots_box[key]){
                event.sessionState.sessionAttributes[key]=event.sessionState.intent.name+"_"+slots_box[key].value.interpretedValue
            }
        })
    return event
}

export function change_intent(template: LexV2Result, intent: string, slot: string):  LexV2Result{
    template.sessionState.intent.name = intent
    template=elicit_slot(template,slot)
    template.sessionState.intent.slots = intents[intent]

    return template
}

export function Validar_correo(correo:string):any{
    var msj = ""
    
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var resultado = expReg.test(correo)
    let result = {
        msj: msj,
        valid: false
    }
    if(resultado === true){
        result.msj = "¡Perfecto, muchas gracias!. Dime, ¿En qué puedo ayudarte? "
        console.log("good")
        result.valid = true
        
    }else{
        result.msj = "El correo no existe favor de verificarlo"
        console.log("comeme la pinga")
        
    }
    return result
    
}

export function Validar_alias(alias:string):any{
    var msj = ""
    var datos = {
        Id : 123456,
        Alias: "Equipo001",
        Carrier: 2,
        Tdesconexion: 10
    }
    let result = {
        msj: msj,
        valid: false,
        datos: datos
    }
    if (alias != datos.Alias){
        result.msj = "No, " + alias + "Ingresa el dispositivo correcto, por favor"
        result.valid = false
    }else{
        result.valid = true
        result.msj = "Claro, enviaremos un reset a tu dispositivo, " + alias + " para corregir el incidente."
    }
    return result
}

export function Validar_tiempo(tiempo: number){
    var msj = ""
    if (tiempo > 10){
        msj = "Reset"
    }else{
        msj= "Kill"
    }
    return msj

}

export function Mandar_mensaje(template: LexV2Result,  message: string):LexV2Result{
    template.messages = [{
        contentType: "PlainText",
    content: message,
    }]
    template.sessionState.intent.state = "Fulfilled"
    template.sessionState.dialogAction.type = "Close"

    return template
}

export function Generar_ticket(){
    var msj = "Ok en un momento se generará la solicitud del reporte, espera un momento por favor."
    var ticket = "154XDF"

    let result = {
        msj:msj,
        ticket:ticket
    }
    return result
}   





