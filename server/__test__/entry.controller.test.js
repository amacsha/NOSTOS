const supertest = require('supertest');
const Koa = require('koa');
const {bodyParser} = require('@koa/bodyparser');
const {default: router} = require('../src/router')

const {describe, it, test, expect, beforeEach, beforeAll, afterAll} = require('@jest/globals')

const {clearDatabase} = require('./helpers')
const {prisma} = require('../src/models/db')


describe('Entry', () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());
  const request = supertest.agent(app.callback())

  let users = []
  let places = []
  let entries = []
  beforeAll(async () => {
    await clearDatabase();
    await prisma.user.createMany({data: [
      {
        email: 'test@test',
        username: 'testUSer',
        password: 'test_password',
        filter_preference: 'top rated',
      },
      {
        email: 'D@test',
        username: 'D',
        password: 'test_password',
        filter_preference: 'recent',
      },
    ]})
    users = await prisma.user.findMany({});

    await prisma.place.createMany({data: [
      {lat: 100, lng: 100, name: 'The British Museum', city: 'London'},
      {lat: 900, lng: 900, name: 'The thames', city: 'London'},
    ]})
    places = await prisma.place.findMany({})
  })

  afterAll(() => {
    prisma.$disconnect();
  })

  it('should create new entry', async () => {
    const response1 = await request
    .post('/entry/addOne')
    .send({
      placeId: places[0].id,
      authorId: users[0].id,
      title: "the museum of my dreams",
      content: "it was super cool, people from all over just gave stuff for this museonm!",
    });

    const response2 = await request
    .post('/entry/addOne')
    .send({
      placeId: places[0].id,
      authorId: users[1].id,
      title: "cool place",
      content: "it's fine.",
    });

    const response3 = await request
    .post('/entry/addOne')
    .send({
      placeId: places[1].id,
      authorId: users[1].id,
      title: "bad place",
      content: "it's not fine.",
    });

    entries = [response1.body, response2.body, response3.body]
    const db = await prisma.entry.findMany({});
    expect(response1.status).toBe(200);
    expect(db.length).toBe(3);
  })

  it('should get entry by ID', async () => {
    const response = await request
    .get(`/entry/getOne/${entries[0].id}`)

    expect(response.body.title).toEqual(entries[0].title);
  })

  it('should get all entries in a place', async () => {
    const response = await request
    .get(`/entry/getMany/byPlace/${places[0].id}/`)

    expect(response.body.length).toBe(2);
  })

  it('should get all entries in a city', async () => {
    const response = await request
    .get(`/entry/getMany/byCity/London/`)

    expect(response.body.length).toBe(3);
  })
})