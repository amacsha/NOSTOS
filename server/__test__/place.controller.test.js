const supertest = require('supertest');
const Koa = require('koa');
const {bodyParser} = require('@koa/bodyparser');
const {default: router} = require('../src/router')

const {describe, it, test, expect, beforeEach, beforeAll, afterAll} = require('@jest/globals')
const {prisma} = require('../src/models/db')

describe('Place', () => {
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

  it('should add a new place to the database', async () => {
    const data = {lat: 50, lng: 50, name: 'The Cenotaph', city: 'London'}
    const response = await request.post('/place/addNew').send(data);
    const result = await prisma.place.findMany({});

    expect(response.status).toBe(201);
    expect(result.length).toBeGreaterThan(0);
  })

  it('should add multiple places to the database', async () => {
    const data = [
      {lat: 100, lng: 100, name: 'The British Museum', city: 'London'},
      {lat: 600, lng: 600, name: 'Godzilla', city: 'Tokyo'},
      {lat: 900, lng: 900, name: 'Tapas Bar', city: 'Madrid'}
    ];
    const response = await request.post('/place/addMany').send(data);
    const results = await prisma.place.findMany({});

    expect(response.status).toBe(201);
    expect(results.length).toBe(4);
  })

  it('should retrieve all places in the database', async () => {
    const response = await request.get('/place/getAll');
    const results = await prisma.place.findMany({});

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    expect(results[0].name).toBe('The Cenotaph')
    expect(results[3].name).toBe('Tapas Bar')
  })

  it('should retrieve all places in the database for a particular city', async () => {
    const response = await request.get('/place/getByCity/London');
    const results = await prisma.place.findMany({
      where: {city: 'London'}
    });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(results.length).toBe(2);
  })
})