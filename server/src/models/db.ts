import { PrismaClient } from "@prisma/client";
import 'dotenv/config'
import { Context } from 'koa';
import { Context } from 'koa';

let url = process.env.ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: url
    }
  }
});

async function confirmSQLConnection(ctx: Context) {
  try {
    console.log('Attempting to connect to AWS ...')
    await prisma.$connect();
    ctx.response.status = 200;
    ctx.response.body = 'OK'
    process.stdout.write("\u001b[1A\u001b[K");
    console.log('Attempting to connect to AWS ... OK!')
  } catch (error) {
    process.stdout.write("\u001b[1A\u001b[K");
    console.log('Attempting to connect to AWS ... FAILED!')
    console.error(error);
    ctx.respose.status = 500;
    ctx.response.body = 'Internal Server Error'
  }
}

export { prisma, confirmSQLConnection }
export default prisma