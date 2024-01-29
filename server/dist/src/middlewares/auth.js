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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_client = require('../models/db');
const authMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = ctx.session;
        const user = yield auth_client.user.findUnique({ id: uid });
        if (!user)
            throw new Error();
        ctx.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        ctx.status = 401;
        ctx.body = { error: 'Server error' };
    }
});
exports.authMiddleware = authMiddleware;
