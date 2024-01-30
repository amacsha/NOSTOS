const supertest = require('supertest');
const Koa = require('koa');
const {bodyParser} = require('@koa/bodyparser');
const {default: router} = require('../src/router')

const {describe, it, test, expect, beforeEach, beforeAll, afterAll} = require('@jest/globals')
const {prisma} = require('../src/models/db')

describe('Comments', () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());
  const request = supertest.agent(app.callback())

  beforeAll(async () => {
    // The order is important! Do not change!
    await prisma.comment.deleteMany({});
    await prisma.rating.deleteMany({});
    await prisma.lastVisited.deleteMany({});
    await prisma.entry.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.place.deleteMany({});
  })

  afterAll(() => {
    prisma.$disconnect();
  })

  it('should add a new comment to an entry', () => {

  })
  it('should add a new comment to an entry', () => {

  })
  it('should add a new comment to an entry', () => {

  })
  it('should add a new comment to an entry', () => {

  })
})