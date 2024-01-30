const request = require('supertest');
const app = require('../src/index');
const {describe, it, test, expect, beforeEach, beforeAll, afterAll} = require('@jest/globals')

const {prisma} = require('../src/models/db')

// const {PrismaClient} = require('@prisma/client');
// const prisma = new PrismaClient();

describe('Place', () => {
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

  it('should add new places to the database', async () => {
    const data = {
      lat: 100,
      lng: 100,
      name: 'Great spot',
      city: 'London'
    }

    const response = await request(app.callback()).post('/place/addNew').send(data);
    const db = await prisma.place.findMany({});
    expect(response.status).toBe(201);
    expect(db.length).toBeGreaterThan(0);
  })

  it('should add multiple places to the database', async () => {
    const data = [
      {lat: 100, lng: 100, name: 'The British Museum', city: 'London'},
      {lat: 600, lng: 600, name: 'Godzilla', city: 'Tokyo'},
      {lat: 900, lng: 900, name: 'Tapas Bar', city: 'Madrid'}
    ];

    const response = await request(app.callback()).post('/place/addMany').send(data);
    const results = await prisma.place.findMany({});
    expect(response.status).toBe(201);
    expect(results.length).toBe(4);
  })

  it('should retrieve all places in the database', async () => {
    const response = await request(app.callback()).get('/place/getByCity/London');
    console.log()
    expect(response.body.length).toBeGreaterThan(0);
  })
})