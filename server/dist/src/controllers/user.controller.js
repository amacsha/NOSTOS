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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserFilterPreference = exports.setUserFilterPreference = exports.getOneUser = exports.createOneUser = void 0;
const user_client = require('../models/db');
const bcrypt_1 = __importDefault(require("bcrypt"));
const createOneUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    const userFromDB = yield user_client.user.findUnique({ where: { email: body.email } });
    if (userFromDB) {
        ctx.status = 409;
        ctx.body = { error: '409', message: 'User already exists' };
    }
    try {
        if (body.password === "")
            throw new Error();
        const hash = yield bcrypt_1.default.hash(body.password, 10);
        const user = yield user_client.user.create({
            data: {
                id: body.id,
                email: body.email,
                username: body.username,
                password: hash,
                filter_preference: body.filter_preference,
            },
        });
        ctx.status = 201;
        ctx.body = user;
    }
    catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Server error' };
    }
});
exports.createOneUser = createOneUser;
const loginUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
});
const getOneUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_client.user.findUnique({
            where: { id: Number(ctx.params.id) },
        });
        ctx.status = 200;
        ctx.body = user;
    }
    catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Server error' };
    }
});
exports.getOneUser = getOneUser;
const deleteUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_client.user.delete({
            where: { id: Number(ctx.params.id) },
        });
        ctx.status = 200;
        ctx.body = user;
    }
    catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Server error' };
    }
});
exports.deleteUser = deleteUser;
const setUserFilterPreference = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    try {
        const preference = yield user_client.user.update({
            where: { id: Number(ctx.params.id) },
            data: { filter_preference: body.filter_preference },
        });
        ctx.status = 201;
        ctx.body = preference;
    }
    catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Server error' };
    }
});
exports.setUserFilterPreference = setUserFilterPreference;
const getUserFilterPreference = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_client.user.findUnique({
            where: { id: Number(ctx.params.id) },
            select: { filter_preference: true },
        });
        ctx.status = 200;
        ctx.body = user;
    }
    catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Server error' };
    }
});
exports.getUserFilterPreference = getUserFilterPreference;
