import { LexV2Event, LexV2Result } from "aws-lambda/trigger/lex-v2";
import {base_template, Mandar_mensaje, save_sessionAttributes, elicit_slot} from "../response_templates";

export class GenerarTicketIntentHandler{
    public Handle(event: LexV2Event): LexV2Result {
        let result: LexV2Result = base_template(event)
        event = save_sessionAttributes(event)
        result.sessionState.sessionAttributes = event.sessionState.sessionAttributes
        
        console.log("MIRAME")
        if(!event.sessionState.sessionAttributes.Final){
            console.log("MIRAME")
            
        }

    return result
    }
}
