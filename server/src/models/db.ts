import { PrismaClient } from "@prisma/client";
import 'dotenv/config'
import {Context} from 'koa';

let url = process.env.ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
// console.log(url)

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: url
    }
  }
});

async function confirmSQLConnection(ctx: Context) {
  try {
    console.log(ctx)
    console.log('Attempting to connect to AWS.')
    await prisma.$connect();
    ctx.response.status = 200;
    ctx.response.body = 'OK'
  } catch (error) {
    console.error(error);
    ctx.respose.status = 500;
    ctx.response.body = 'Internal Server Error'
  }
}

export {prisma, confirmSQLConnection}
export default prisma