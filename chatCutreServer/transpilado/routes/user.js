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
const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');
user.post("/signin", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, user_mail, user_password } = req.body;
    if (user_name && user_mail && user_password) {
        let query = "INSERT INTO user (user_name, user_mail, user_password) ";
        query += `VALUES ('${user_name}', '${user_mail}', '${user_password}')`;
        const rows = yield db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
}));
user.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_mail, user_password } = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'`;
    const rows = yield db.query(query);
    if (user_mail && user_password) {
        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        }
        else {
            return res.status(200).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
}));
user.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM user";
    const rows = yield db.query(query);
    return res.status(200).json({ code: 200, message: rows });
}));
module.exports = user;
//# sourceMappingURL=user.js.map