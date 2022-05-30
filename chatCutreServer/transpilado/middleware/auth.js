"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.default = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.jwt.verify(token, "debugkey");
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ code: 401, message: "No tienes permiso" });
    }
};
//# sourceMappingURL=auth.js.map