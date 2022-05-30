"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatbot_1 = __importDefault(require("./routes/chatbot"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const index_1 = __importDefault(require("./middleware/index"));
const cors_1 = __importDefault(require("./middleware/cors"));
const app = (0, express_1.default)();
app.use(cors_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", index_1.default);
app.use("/chatbot", chatbot_1.default);
app.use(notFound_1.default);
app.listen(3000, () => {
    console.log("Server is Runnig");
});
//# sourceMappingURL=index.js.map