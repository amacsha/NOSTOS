"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// require('dotenv').config();
// const path = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL;
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});
exports.default = prisma;
