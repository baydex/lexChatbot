"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTextParamsTemplate = exports.generateConfigTemplate = void 0;
const params = {
    botAliasId: "TSTALIASID",
    botId: "KPIYFAOETK",
    localeId: "es_419",
    region: "us-east-1",
    secretAccessKey: "W7x3sbIK+gM5F+RkcH+ejwYG4HCpBJ6H0zjLBcpL",
    accessKeyId: "AKIA3MTEMVIDOFLR7LEL"
};
function generateConfigTemplate() {
    var template = {
        region: params.region,
        credentials: {
            accessKeyId: params.accessKeyId,
            secretAccessKey: params.secretAccessKey,
        },
    };
    return template;
}
exports.generateConfigTemplate = generateConfigTemplate;
function generateTextParamsTemplate(sessionId, text) {
    var template = {
        botAliasId: params.botAliasId,
        botId: params.botId,
        localeId: params.localeId,
        sessionId: sessionId,
        text: text,
    };
    return template;
}
exports.generateTextParamsTemplate = generateTextParamsTemplate;
//# sourceMappingURL=botParams.js.map