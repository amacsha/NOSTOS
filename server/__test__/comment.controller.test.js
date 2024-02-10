const supertest = require('supertest');
const Koa = require('koa');
const {bodyParser} = require('@koa/bodyparser');
const {default: router} = require('../src/router')

const {describe, it, test, expect, beforeEach, beforeAll, afterAll} = require('@jest/globals')

const {clearDatabase} = require('./helpers')
const {prisma} = require('../src/models/db')


describe('Comments', () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());
  const request = supertest.agent(app.callback())
  
  beforeAll(async () => {
    await clearDatabase();

    await prisma.user.createMany({
      data: [
        {
          id: 1,
          email: "test@test.com",
          username: 'test',
          password: 'test123456',
          filter_preference: 'top rated'
        },
        {
          id: 2,
          email: "test2@test2.com",
          username: 'test2',
          password: 'test123456',
          filter_preference: 'top rated'
        }
      ]
    })

    await prisma.place.create({
      data:
      {
        id: 1,
        lat: 100,
        lng: 100,
        name: 'Marble Arch',
        city: 'London'
      }
    });

    await prisma.entry.create({
      data: {
        id: 1,
        placeId: 1,
        authorId: 1,
        title: 'Mock Title',
        content: 'Mock Content'
      }
    })
  })

  afterAll(() => {
    prisma.$disconnect();
  })

  it('should add a new comment to an entry', async () => {
    const data = {
      commenterId: 1, content: 'Great entry!'
    }
    const response = await request.post(`/comment/addNew/1`).send(data);
    const result = await prisma.comment.findMany({});

    expect(response.status).toBe(201);
    expect(result.length).toBe(1);
  })

  it('should retrieve all comments on an entry', async () => {
    const data = {commenterId: 2, content: 'Wow!'};
    await request.post(`/comment/addNew/1`).send(data);

    const response = await request.get(`/comment/getAll/1`);
    const result = await prisma.comment.findMany({
      where: {entryId: 1}
    })

    expect(response.status).toBe(200);
    expect(result.length).toBe(2);
  })

  it('should delete a comment from an entry', async () => {
    const response = await request.delete(`/comment/delete/byAuthor/1/forEntry/1`);
    await prisma.comment.delete({
      where: {
        commenterId_entryId: {
          commenterId: 2,
          entryId: 1
        }
      }
    });

    const result = await prisma.comment.findMany({});
    expect(response.status).toBe(200);
    expect(result.length).toBe(0)
  })
})