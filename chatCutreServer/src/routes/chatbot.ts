import express from 'express';
import {LexRuntimeV2} from 'aws-sdk';
import { generateConfigTemplate, generateTextParamsTemplate} from '../resources/botParams';

const chatbot = express.Router();
var chatResponse = ""

chatbot.post("/message", async (req:any , res:any, next:any) =>{

    const {sessionId, message} = req.body;

    var config = generateConfigTemplate()

    var lexruntime = new LexRuntimeV2(config);
    
    var paramsText = generateTextParamsTemplate(sessionId, message)
    
    lexruntime.recognizeText(paramsText).promise().then(
            (data)=>{
                const message:string = data.messages[0].content
                return res.status(200).json({code: 200, message: message});
            }
        ).catch(
            (err)=>{
            console.log(err)
            return res.status(200).json({code: 400, message: "Sin respuesta"});
        }
    );
});

chatbot.post("/getSession", async (req:any , res:any, next:any) =>{
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    
    return res.status(200).json({code: 200, message: id});
});

chatbot.get("/", async (req:any , res:any, next:any) =>{
    return res.status(200).json({code: 200, message: "A espera de nuevos mensajes"});
});

export = chatbot;