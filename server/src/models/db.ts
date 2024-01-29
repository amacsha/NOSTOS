import { PrismaClient } from "@prisma/client";
import 'dotenv/config'

let url = process.env.ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
console.log(url)

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: url
    }
  }
});

export default prisma