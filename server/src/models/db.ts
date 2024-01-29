const { PrismaClient } = require('@prisma/client')
const {resolve} = require('path')
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

async function test() {
  const user = await prisma.User.create({
    data: {
      username: 'Alice',
      email: 'alice@prisma.io',
      password: 'secret',
      filter_preference: 'top rated'
    },
  })

  console.log(user)
}

module.exports = test