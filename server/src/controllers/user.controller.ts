import Koa from 'koa';
const user_client = require('../models/db');
import { UserType } from '../../server-types/types';
import bcrypt from 'bcrypt';

const createOneUser = async (ctx: Koa.Context) => {
  const body = <UserType>ctx.request.body;
  const userFromDB = await user_client.user.findUnique({ where: {email: body.email} });
  if (userFromDB) {
    ctx.status = 409;
    ctx.body = { error: '409', message: 'User already exists' };
  }
  try {
    if (body.password === "") throw new Error();
    const hash = await bcrypt.hash(body.password, 10);
    const user: UserType = await user_client.user.create({
      data: {
        id: body.id,
        email: body.email,
        username: body.username,
        password: hash,
        filter_preference: body.filter_preference,
      },
    });
    ctx.status = 201;
    ctx.body = user;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

const loginUser = async (ctx: Koa.Context) => {
    
}

const getOneUser = async (ctx: Koa.Context) => {
  try {
    const user = await user_client.user.findUnique({
      where: { id: Number(ctx.params.id) },
    });
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

const deleteUser = async (ctx: Koa.Context) => {
  try {
    const user = await user_client.user.delete({
      where: { id: Number(ctx.params.id) },
    });
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

const setUserFilterPreference = async (ctx: Koa.Context) => {
  const body = <UserType>ctx.request.body;
  try {
    const preference = await user_client.user.update({
      where: { id: Number(ctx.params.id) },
      data: { filter_preference: body.filter_preference },
    });
    ctx.status = 201;
    ctx.body = preference;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

const getUserFilterPreference = async (ctx: Koa.Context) => {
  try {
    const user = await user_client.user.findUnique({
      where: { id: Number(ctx.params.id) },
      select: { filter_preference: true },
    });
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

const logout = (ctx: Koa.Context) => {
  ctx.session.destroy(error => {
    if (error) {
      res
        .status(500)
        .send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.status(200).send({ message: 'Logout successful' });
    }
  });
};

export {
  createOneUser,
  getOneUser,
  setUserFilterPreference,
  getUserFilterPreference,
  deleteUser,
};
