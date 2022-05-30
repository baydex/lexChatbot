import { LexV2Event, LexV2Message, LexV2Result } from "aws-lambda/trigger/lex-v2";
export class closing_session{
    public closeSession(event:LexV2Event, err:any, callback: any){


        var msjs: [LexV2Message] = [{
            contentType: "PlainText",
            content: "Se detecto un error y chat se cerrará."
        }]

        if(err)
         msjs.push({
            contentType: "PlainText",
            content: "Error: " + err
        });

        var closeResult: LexV2Result = {
            sessionState: {
                sessionAttributes: event.sessionState.sessionAttributes,
                intent: {
                    state: "Fulfilled",
                    name: event.sessionState.intent.name
                },
                dialogAction: {
                    type: "Close",
                }

            },
            messages: msjs
        };

        callback(null, closeResult);
    }

}
