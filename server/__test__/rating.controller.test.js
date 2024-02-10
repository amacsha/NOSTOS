const supertest = require('supertest');
const Koa = require('koa');
const {bodyParser} = require('@koa/bodyparser');
const {default: router} = require('../src/router')

const {describe, it, test, expect, beforeEach, beforeAll, afterAll} = require('@jest/globals')

const {clearDatabase} = require('./helpers')
const {prisma} = require('../src/models/db')

describe('Rating', () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());
  const request = supertest.agent(app.callback())

  let users = []
  let place = {}
  let entry = {}
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

    await prisma.place.create({data:
      {lat: 100, lng: 100, name: 'The British Museum', city: 'London'},
    })
    place = await prisma.place.findFirst({})

    await prisma.entry.create({data:
      {placeId: place.id, authorId: users[0].id, title: "test-entry", content: "testtesttest"},
    })

    entry = await prisma.entry.findFirst({})
  })

  afterAll(() => {
    prisma.$disconnect();
  })

  it('should create new rating at first', async () => {
    const response1 = await request
    .post('/rating/setUserRating')
    .send({raterId: users[0].id, entryId: entry.id, value: 5});

    const response2 = await request
    .post('/rating/setUserRating')
    .send({raterId: users[1].id, entryId: entry.id, value: 2});

    const rating1 = await prisma.rating.findUnique({
      where: {
        raterId_entryId: {
          raterId: users[0].id,
          entryId: entry.id,
        }
      }
    });
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(rating1.value).toEqual(5);
  })

  it('should update a rating if one exists', async () => {
    const response = await request
    .post('/rating/setUserRating')
    .send({raterId: users[0].id, entryId: entry.id, value: 4});

    const rating = await prisma.rating.findUnique({
      where: {
        raterId_entryId: {
          raterId: users[0].id,
          entryId: entry.id,
        }
      }
    });
    expect(response.status).toBe(200);
    expect(rating.value).toEqual(4);
  })

  it('should get a rating given user and entry', async () => {
    const response = await request
    .get(`/rating/onEntry/${entry.id}/byUser/${users[1].id}`)

    expect(response.status).toBe(200);
    expect(response.body.value).toEqual(2);
  })

  it('should return avg rating for an entry', async () => {
    const response = await request
    .get(`/rating/AverageEntryRating/${entry.id}`)
    expect(response.body._avg.value).toEqual(3);
  })
})