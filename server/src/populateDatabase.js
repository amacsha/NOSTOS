const { PrismaClient } = require('@prisma/client')
const { mockPlaces } = require('./places');
const dotenv = require('dotenv')


const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function populate () {
    try {
        prisma.$connect();
        await prisma.place.createMany({
           data: mockPlaces
       })
    } catch (error) {
        console.log(error)
    }
}

populate();


