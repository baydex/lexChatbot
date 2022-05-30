"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = require("aws-sdk");
const botParams_1 = require("../resources/botParams");
const chatbot = express_1.default.Router();
var chatResponse = "";
chatbot.post("/message", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId, message } = req.body;
    var config = (0, botParams_1.generateConfigTemplate)();
    var lexruntime = new aws_sdk_1.LexRuntimeV2(config);
    var paramsText = (0, botParams_1.generateTextParamsTemplate)(sessionId, message);
    lexruntime.recognizeText(paramsText).promise().then((data) => {
        const message = data.messages[0].content;
        return res.status(200).json({ code: 200, message: message });
    }).catch((err) => {
        console.log(err);
        return res.status(200).json({ code: 400, message: "Sin respuesta" });
    });
}));
chatbot.post("/getSession", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return res.status(200).json({ code: 200, message: id });
}));
chatbot.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ code: 200, message: "A espera de nuevos mensajes" });
}));
module.exports = chatbot;
//# sourceMappingURL=chatbot.js.map