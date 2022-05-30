import { closing_session } from "./close_Session";
import { LexV2Event, LexV2Message, LexV2Result } from "aws-lambda/trigger/lex-v2";
import * as moment from "moment-timezone";
import { handlers } from "./Intents/handlers";
import {base_template, Generar_ticket} from "./response_templates";

class index {

    public handler(event: LexV2Event, context: any, callback: any) 
    {

        console.log(moment() + " Request = ", JSON.stringify(event));
        console.log(moment() + " Context = ", JSON.stringify(context));

        if (event.sessionState.sessionAttributes == null)
            event.sessionState.sessionAttributes = {};

        try {
            if (event.invocationSource === "DialogCodeHook") {
                console.log("event:" + JSON.stringify(event));
                var intent_name = event.sessionState.intent.name;
                var result

                if (intent_name in handlers){
                    var handler = handlers[intent_name]
                    result = new handler().Handle(event);
                }else{
                    result = base_template(event)
                }
                
                callback(null, result);


            } else {
               //todo: codigo para fullfilment.
               
               result = base_template(event)
               result = new handlers["Generar_ticket"]().Handle(event)
               console.log("INDEX")
               callback(null, result);
               
               
            }


        } catch (err) {
            console.log("error en validacion inicial: " + err);
            new closing_session().closeSession(event, err, callback);
        }

    }

}   

export let handler = new index().handler;
