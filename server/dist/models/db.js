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
const { PrismaClient } = require('@prisma/client');
const { resolve } = require('path');
require('dotenv').config();
const path = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL;
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: path
        }
    }
});
// Run inside `async` function
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.User.create({
            data: {
                username: 'Alice',
                email: 'alice@prisma.io',
                password: 'secret',
                filter_preference: 'top rated'
            },
        });
        console.log(user);
    });
}
module.exports = test;
