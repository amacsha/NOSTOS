const request = require('supertest');
const app = require('../src/index');
const {describe, it, test, expect, beforeEach, beforeAll, afterAll} = require('@jest/globals')

const {prisma} = require('../src/models/db')

describe('Entry', () => {
  let users = []
  let place = {}
  let entries = {}
  beforeAll(async () => {
    // The order is important! Do not change!
    await prisma.comment.deleteMany({});
    await prisma.rating.deleteMany({});
    await prisma.lastVisited.deleteMany({});
    await prisma.entry.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.place.deleteMany({});

    //adding mock data
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
    const response1 = await request(app.callback())
    .post('/rating/setUserRating')
    .send({raterId: users[0].id, entryId: entry.id, value: 5});

    const response2 = await request(app.callback())
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
    const response = await request(app.callback())
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
    const response = await request(app.callback())
    .get(`/rating/onEntry/${entry.id}/byUser/${users[1].id}`)

    expect(response.status).toBe(200);
    expect(response.body.value).toEqual(2);
  })

  it('should return avg rating for an entry', async () => {
    const response = await request(app.callback())
    .get(`/rating/AverageEntryRating/${entry.id}`)
    expect(response.body._avg.value).toEqual(3);
  })
})