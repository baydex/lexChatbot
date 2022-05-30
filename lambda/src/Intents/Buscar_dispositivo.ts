import { LexV2Event, LexV2Result } from "aws-lambda/trigger/lex-v2";
import {base_template, elicit_slot,  save_sessionAttributes, change_intent, Validar_correo, Validar_alias, elicit_intent, Validar_tiempo} from "../response_templates";

export class Buscar_DispositivoIntentHandler{
    public Handle(event: LexV2Event): LexV2Result {
        let result: LexV2Result = base_template(event)

        if(!event.sessionState.sessionAttributes.Guardar_correo){
            result = change_intent(result,"Validar_correo","Guardar_correo")
            return result
        }

        event = save_sessionAttributes(event) 
        result.sessionState.sessionAttributes = event.sessionState.sessionAttributes
        var atributos = result.sessionState.sessionAttributes
        
        if(!atributos.Alias){
            result = elicit_slot(result, "Alias")
            return result 
        }
        var alias = ""
        alias=(atributos.Error != null)? atributos.Error: atributos.Alias       
        alias= alias.slice(19,)
        var validar = Validar_alias(alias)
        console.log("ARREGLO",validar.datos.Tdesconexion)
        if (validar.valid ==true){
            result = change_intent(result,"Enviar_reset","Verificar")
        }else{
            result = elicit_slot(result,"Error") 
            atributos.Alias= atributos.Error
        }
        
        return result
    }
}