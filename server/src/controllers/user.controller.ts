import Koa from 'koa';
const user_client = require('../models/db');
import { UserType } from '../../server-types/types';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const createOneUser = async (ctx: Koa.Context) => {
  const body = <UserType>ctx.request.body;

  const existingUserByEmail = await user_client.user.findUnique({
    where: { email: body.email },
  });

//   const existingUserByUsername = await user_client.user.findUnique({
//     where: { username: body.username },
//   })

  if (existingUserByEmail) {
    ctx.status = 409;
    ctx.body = { error: '409', message: 'User already exists' };
  }

  try {
    if (body.password === '') throw new Error('Password cannot be empty');

    const hash = await bcrypt.hash(body.password, 10);

    const user: UserType = await user_client.user.create({
      data: {
        id: body.id,
        email: body.email,
        username: body.username,
        password: hash,
        filter_preference: 'top rated',
      },
    });

    const accessToken = jwt.sign(user, process.env.SECRET_KEY!);

    ctx.status = 201;
    ctx.body = accessToken;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

const loginUser = async (ctx: Koa.Context) => {
    const body = <UserType>ctx.request.body;

  try {
    const user = await user_client.user.findUnique({
        where: {email: body.email}
    });
    const validatedPass = await bcrypt.compare(body.password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign(user, process.env.SECRET_KEY!);
    ctx.status = 200;
    ctx.body = accessToken;
  } catch (error) {
    console.error(error);
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
};

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

const logoutUser = (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.body = {accesToken: null};
};

export {
  createOneUser,
  getOneUser,
  setUserFilterPreference,
  getUserFilterPreference,
  deleteUser,
  loginUser,
  logoutUser
};
