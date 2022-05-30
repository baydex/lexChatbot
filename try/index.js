// import { LexRuntimeV2Client, DeleteSessionCommand } from "@aws-sdk/client-lex-runtime-v2";
const { LexRuntimeV2Client, StartConversationCommand,PutSessionCommand } = require("@aws-sdk/client-lex-runtime-v2");


function gen_id() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

const config  = {
    region: "us-east-1",
    credentials:{
        accessKeyId:"AKIA3MTEMVIDOFLR7LEL", 
        secretAccessKey:"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", 
    }
  };

const client = new LexRuntimeV2Client(config);

input = {
    botAliasId: "TSTALIASID",
    botId: "S0KQQYM6TY",
    conversationMode: "TEXT",
    sessionState: {
        "dialogAction": { 
        
            "type": "ConfirmIntent"
            
         },
         "intent": { 
            "confirmationState": "Confirmed",
            "name": "Intento",
            
            "state": "Fulfilled"
         }

    },
    "messages": [ 
        { 
           "content": "saludar ya",
           "contentType": "PlainText"
        }
     ],
    localeId: "en_US",
    sessionId: gen_id(),
    requestEventStream:{
        "TextInputEvent": { 
            //"clientTimestampMillis": number,
            "eventId": "aBc",
            "text": "pinga"
         }
    }
}

const command = new PutSessionCommand(input);
  
client.send(command, (err, data) => {
    if(data){
        console.log("ok")
        console.log(data)
    }else{
        console.log("esto fallo")
        console.log(err)
    }
    console.log("LO QUE SEA")
  });
  

