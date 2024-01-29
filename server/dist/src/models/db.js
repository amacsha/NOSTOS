"use strict";
const { PrismaClient } = require('@prisma/client');
const { resolve } = require('path');
require('dotenv').config();
// const path = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});
module.exports = prisma;
