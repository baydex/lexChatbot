import { LexV2Event, LexV2Result } from "aws-lambda/trigger/lex-v2";
import {base_template, elicit_slot, Generar_ticket, save_sessionAttributes, change_intent,Validar_correo,Mandar_mensaje, elicit_intent,Validar_tiempo, Validar_alias} from "../response_templates";

export class EnviarResetIntentHandler{
    public Handle(event: LexV2Event): LexV2Result {
        let result: LexV2Result = base_template(event)
        event = save_sessionAttributes(event)
        result.sessionState.sessionAttributes = event.sessionState.sessionAttributes
        var atributos = result.sessionState.sessionAttributes
        
        if(!event.sessionState.sessionAttributes.Verificar){
            result = elicit_slot(result, "Verificar")
            
            return result 
        }

        var ver = Validar_alias(event.sessionState.sessionAttributes.Alias)
        var tiempo = ver.datos.Tdesconexion
        ver = ver.datos.Alias
        var salir = true
        var confirmar = event.sessionState.sessionAttributes.Verificar.slice(13,)
        var estado = Validar_tiempo(tiempo)

        if(event.sessionState.sessionAttributes.Verificar2 || estado =="Reset"){
            confirmar = (estado =="Reset")?atributos.Verificar.slice(13,): atributos.Verificar2.slice(13,)
            if(confirmar == "no"){
                result = Mandar_mensaje(result, "Fue un placer ayudarte")
            }else{

                var ticket = Generar_ticket()
                change_intent(result, "Generar_ticket", "Final")
                ticket= Generar_ticket()
                var destinatario = event.sessionState.sessionAttributes.Guardar_correo.slice(15,)
                console.log("enviar correo", ticket.ticket, destinatario)
            }

        }if(estado == "Kill" && !event.sessionState.sessionAttributes.Verificar2){
            if(confirmar=="no"){   
                result = Mandar_mensaje(result, "Fue un placer ayudarte")
            }else{
                result = elicit_slot(result, "Verificar2")
            }
        }
      
        return result  
    }
}