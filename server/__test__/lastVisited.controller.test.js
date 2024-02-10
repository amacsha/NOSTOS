const supertest = require('supertest');
const Koa = require('koa');
const {bodyParser} = require('@koa/bodyparser');
const {default: router} = require('../src/router')

const {describe, it, test, expect, beforeEach, beforeAll, afterAll} = require('@jest/globals')

const {clearDatabase} = require('./helpers')
const {prisma} = require('../src/models/db')


describe('Last visited', () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());
  const request = supertest.agent(app.callback())

  let lastVisit

  beforeAll(async () => {
    await clearDatabase();
    await prisma.user.create({data:
      {
        id: 1,
        email: 'test@test',
        username: 'testUSer',
        password: 'test_password',
        filter_preference: 'top rated',
      },
    })

    await prisma.place.createMany({data:
      [
        {lat: 100, lng: 100, name: 'The British Museum', city: 'London', id: 1},
        {lat: 101, lng: 101, name: 'The Good Place', city: 'London', id: 2},
      ]
    })
  })

  afterAll(() => {
    prisma.$disconnect();
  })

  it('should set last visit time for user at place', async () => {
    const response = await request
    .post(`/last-visited/setUserLastVisit`)
    .send({
      userId: 1,
      placeId: 1,
    });

    expect(response.status).toBe(201);
    lastVisit = response.body.visit_time
    expect(lastVisit).not.toBeNull()
  })

  it('should update last visit time for user at place', async () => {
    const response = await request
    .post(`/last-visited/setUserLastVisit`)
    .send({
      userId: 1,
      placeId: 1,
    });

    expect(response.status).toBe(201);
    expect(new Date(response.body.visit_time) - new Date(lastVisit)).toBeGreaterThan(0)
  })

  it('should get a users last visited places', async () => {
    const response = await request
    .get(`/last-visited/getLastUserPlaces/1`)

    expect(response.status).toBe(201);
    expect(response.body.length).toEqual(1)
  })

  it('should get ignore places visited longer then 48 hours ago', async () => {
    const longAgo = new Date()
    longAgo.setHours(longAgo.getHours() - 100);

    await prisma.lastVisited.create({data: {
      userId: 1,
      placeId: 2,
      visit_time: longAgo,
    }})

    const response = await request
    .get(`/last-visited/getLastUserPlaces/1`)

    expect(response.status).toBe(201);
    expect(response.body.length).toEqual(1)
  })
})