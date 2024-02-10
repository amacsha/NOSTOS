const supertest = require('supertest');
const Koa = require('koa');
const { bodyParser } = require('@koa/bodyparser');
const { default: router } = require('../src/router')
const bcrypt = require('bcrypt');


const { describe, it, test, expect, beforeEach, beforeAll, afterAll } = require('@jest/globals')

const {clearDatabase} = require('./helpers')
const {prisma} = require('../src/models/db')


let userData = {
  email: 'dominic@test.com',
  username: 'dominic',
  password: '123456',
  filter_preference: 'top rated'
}

describe('Comments', () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());
  const request = supertest.agent(app.callback())

  beforeAll(async () => {
    await clearDatabase();
  })

  afterAll(() => {
    prisma.$disconnect();
    console.error.mockRestore();
  })

  beforeEach( () => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => null)
  })

  it('should create a new user', async () => {
    const response = await request.post('/user/createOneUser').send(userData);

    userData.email = "gabriel@test.com";
    userData.username = "gabriel";
    userData.password = await bcrypt.hash(userData.password, 10);

    const result = await prisma.user.create({ data: userData });
    userData.id = result.id;

    expect(result.email).toBe(userData.email);
    expect(response.status).toBe(201);
  })

  it('should not allow duplicate users', async () => {
    const response = await request.post('/user/createOneUser').send(userData);
    try {
      await prisma.user.create({data: userData});
    } catch (error) {
      expect(error).toBeDefined();
    }
    expect(response.status).toBe(409);
  })

  it('should not allow users with an empty password', async () => {
    userData.password = "";
    try {
      const response = await request.post('/user/createOneUser').send(userData);
      expect(response.status).toBe(500);
    } catch (error) {
      expect(error).toBeDefined();
    }
    userData.password = '123456';
  })

  it('should log in a user', async () => {
    const response = await request.post('/login').send(userData);
    expect(response.status).toBe(200);
  })

  it('should deny login for an invalid account', async () => {
    try {
      const response = await request.post('/login').send({
        email: 'junk@junk.com',
        username: 'junk',
        password: '123456',
      });
      expect(response.status).toBe(404);
    } catch (error) {
      expect(error).toBeDefined();
    }
  })

  it('should deny login with incorrect password', async () => {
    userData.password = 'bad password'
    try {
      const response = await request.post('/login').send(userData)
      expect(response.status).toBe(404);
    } catch (error) {
      expect(error).toBeDefined();
    }
    userData.password = '123456'
  })

  it('should retrieve one user', async () => {
    const user = (await prisma.user.findUnique({where: {username: 'gabriel'}}));
    const response = await request.get(`/user/getOneUser/${userData.id}`);

    expect(response.status).toBe(200);
    expect(user.username).toBe('gabriel')
  })

  it('should get user filter preference', async () => {
    const user = (await prisma.user.findUnique({where: {username: 'gabriel'}}));
    const response = await request.get(`/user/getUserFilterPreference/${userData.id}`);

    expect(response.status).toBe(200);
    expect(response.body.filter_preference).toBe('top rated');
    expect(user.filter_preference).toBe('top rated');
  })

  it('should set user filter preference', async () => {
    userData.filter_preference = 'most recent';
    const response = await request.put(`/user/setUserFilterPreference/${userData.id}`).send(userData);

    const user = (await prisma.user.findUnique({where: {username: 'gabriel'}}));
    expect(response.status).toBe(201);
    expect(user.filter_preference).toBe('most recent');
  });
})