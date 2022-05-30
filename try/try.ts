import { AWSError } from 'aws-sdk/lib/error'; 
import {LexRuntimeV2} from 'aws-sdk';
import * as readline from 'readline';


// import * as ll from 'aws-sdk'

function gen_id() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

let botAlias = "TSTALIASID"
let userId = gen_id()
let botName = "Smart_Reset"
let botAliasId = "TSTALIASID"
let botId = "KPIYFAOETK"
let localeId = "es_419"
let sessionId = gen_id()

let configParams:LexRuntimeV2.Types.ClientConfiguration = {
    region:"us-east-1", 
    secretAccessKey: "W7x3sbIK+gM5F+RkcH+ejwYG4HCpBJ6H0zjLBcpL",
    accessKeyId: "AKIA3MTEMVIDOFLR7LEL",
    params : {
        botAlias: botAlias,
        botName: botName,
        userId: userId
    }
}

let lexruntime = new LexRuntimeV2(configParams)

let sessionState: LexRuntimeV2.SessionState = {
    
} 

// var respuesta: <LexRuntimeV2.Types.RecognizeTextResponse, AWSError>
function callback(err: AWSError, data: any) {
    if(data){
        console.log(respuesta)
        console.log("Bot: ",data.messages[0].content)
        let message = ""
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
        rl.question('User: ', (answer) => {
            message = answer
            rl.close();
            enviar_mensaje(message)
        });
    }
    else{
        console.log("error ",err)
    }
}

var paramsText: LexRuntimeV2.Types.RecognizeTextRequest = {
    botAliasId: botAliasId,
    botId: botId,
    localeId: localeId,
    sessionId: sessionId,
    text: "",
}

async function enviar_mensaje(message: string){
    paramsText.text = message
    var respuesta:Request<LexRuntimeV2.RecognizeTextResponse, AWSError>;
    respuesta = lexruntime.recognizeText(paramsText, callback)
}

enviar_mensaje("inicio")
