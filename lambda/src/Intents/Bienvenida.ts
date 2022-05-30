import { LexV2Event, LexV2Result } from "aws-lambda/trigger/lex-v2";
import {base_template, elicit_slot,  save_sessionAttributes, change_intent,Validar_correo,Mandar_mensaje, elicit_intent} from "../response_templates";

export class BienvenidaIntentHandler{
    public Handle(event: LexV2Event): LexV2Result {
        let result: LexV2Result = base_template(event)
        event = save_sessionAttributes(event)
        result.sessionState.sessionAttributes = event.sessionState.sessionAttributes

        if(!event.sessionState.sessionAttributes.Guardar_correo){
            result = elicit_slot(result, "Guardar_correo")
            
            return result 
        }
        
        var email = event.sessionState.sessionAttributes.Guardar_correo.slice(15,)
        var msj = Validar_correo(email)
        console.log("correo:", JSON.stringify(msj))
        if(msj.valid == true){
            result = elicit_intent(result, "Buscar_dispositivo", msj.msj)  
        }
        else{
            result = elicit_slot(result, "Guardar_correo")
            console.log("correo: no valido")
        }
        return result 


            
    }
}