const request = require('supertest');
const app = require('../src/index');
const {describe, it, test, expect, beforeEach, beforeAll, afterAll} = require('@jest/globals')

const {prisma} = require('../src/models/db')

describe('Entry', () => {
  let users = []
  let places = []
  let entries = []
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
    const response1 = await request(app.callback())
    .post('/entry/addOne')
    .send({
      placeId: places[0].id,
      authorId: users[0].id,
      title: "the museum of my dreams",
      content: "it was super cool, people from all over just gave stuff for this museonm!",
    });

    const response2 = await request(app.callback())
    .post('/entry/addOne')
    .send({
      placeId: places[0].id,
      authorId: users[1].id,
      title: "cool place",
      content: "it's fine.",
    });

    const response3 = await request(app.callback())
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
    const response = await request(app.callback())
    .get(`/entry/getOne/${entries[0].id}`)

    expect(response.body.title).toEqual(entries[0].title);
  })

  it('should get all entries in a place', async () => {
    const response = await request(app.callback())
    .get(`/entry/getMany/byPlace/${places[0].id}/`)

    expect(response.body.length).toBe(2);
  })

  it('should get all entries in a city', async () => {
    const response = await request(app.callback())
    .get(`/entry/getMany/byCity/London/`)

    expect(response.body.length).toBe(3);
  })

  it ('should optionally sort by date', async () => {
    const response = await request(app.callback())
    .get(`/entry/getMany/byCity/London/sortBy/recent`)

    expect(response.body[0].id).toEqual(entries[2].id);
  })

  it ('should optionally sort by rating', async () => {
    await prisma.rating.create({data: {raterId: users[0].id, entryId: entries[1].id, value: 5}})
    const response = await request(app.callback())
    .get(`/entry/getMany/byCity/London/sortBy/top-rated`)
    expect(response.body[0].id).toEqual(entries[1].id);
  })
})