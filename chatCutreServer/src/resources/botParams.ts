import {LexRuntimeV2} from 'aws-sdk';

const params = {
    botAliasId: "TSTALIASID",
    botId: "KPIYFAOETK",
    localeId: "es_419",
    region: "us-east-1",
    secretAccessKey: "W7x3sbIK+gM5F+RkcH+ejwYG4HCpBJ6H0zjLBcpL",
    accessKeyId: "AKIA3MTEMVIDOFLR7LEL"
}
export function generateConfigTemplate():LexRuntimeV2.Types.ClientConfiguration{
    var template:LexRuntimeV2.Types.ClientConfiguration = {
        region: params.region,
        credentials:{
            accessKeyId: params.accessKeyId,
            secretAccessKey: params.secretAccessKey,
        },
    }
    return template
}
export function generateTextParamsTemplate(sessionId:string, text:string):LexRuntimeV2.RecognizeTextRequest{
    var template:LexRuntimeV2.RecognizeTextRequest = {
        botAliasId: params.botAliasId,
        botId: params.botId,
        localeId: params.localeId,
        sessionId: sessionId,
        text: text,
    }
    return template
}