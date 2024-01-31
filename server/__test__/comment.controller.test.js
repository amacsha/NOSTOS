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

  let tempUserIds = [];
  let tempPlaceId = 0;
  let tempEntryId = 0;

  beforeAll(async () => {
    await clearDatabase();

    // Comments rely on a User and an Entry (which relies on a Place), so create one of each first.

    // Because prisma autoincrements the id values and does not reset them when the
    // database is cleared, we need to create the new rows and then query them
    // to get the ids.

    await prisma.user.createMany({
      data: [
        {
          email: "test@test.com",
          username: 'test',
          password: 'test123456',
          filter_preference: 'top rated'
        },
        {
          email: "test2@test2.com",
          username: 'test2',
          password: 'test123456',
          filter_preference: 'top rated'
        }
      ]
    })

    tempUserIds = (await prisma.user.findMany({})).map(user => user.id)

    await prisma.place.create({
      data:
      {
        lat: 100,
        lng: 100,
        name: 'Marble Arch',
        city: 'London'
      }
    });

    tempPlaceId = (await prisma.place.findFirst({where: {name: 'Marble Arch'}})).id;

    await prisma.entry.create({
      data: {
        placeId: tempPlaceId,
        authorId: tempUserIds[0],
        title: 'Mock Title',
        content: 'Mock Content'
      }
    })

    tempEntryId = (await prisma.entry.findFirst({where: {title: 'Mock Title'}})).id;
  })

  afterAll(() => {
    prisma.$disconnect();
  })

  it('should add a new comment to an entry', async () => {
    const data = {
      commenterId: tempUserIds[0], content: 'Great entry!'
    }
    const response = await request.post(`/comment/addNew/${tempEntryId}`).send(data);
    const result = await prisma.comment.findMany({});

    expect(response.status).toBe(201);
    expect(result.length).toBe(1);
  })

  it('should retrieve all comments on an entry', async () => {
    const data = {commenterId: tempUserIds[1], content: 'Wow!'};
    await request.post(`/comment/addNew/${tempEntryId}`).send(data);

    const response = await request.get(`/comment/getAll/${tempEntryId}`);
    const result = await prisma.comment.findMany({
      where: {entryId: tempEntryId}
    })

    expect(response.status).toBe(200);
    expect(result.length).toBe(2);
  })

  it('should delete a comment from an entry', async () => {
    const response = await request.delete(`/comment/delete/byAuthor/${tempUserIds[0]}/forEntry/${tempEntryId}`);
    await prisma.comment.delete({
      where: {
        commenterId_entryId: {
          commenterId: Number(tempUserIds[1]),
          entryId: Number(tempEntryId)
        }
      }
    });

    const result = await prisma.comment.findMany({});
    expect(response.status).toBe(200);
    expect(result.length).toBe(0)
  })
})