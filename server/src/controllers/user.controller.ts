import Koa from 'koa';
import prisma from '../models/db';
import { UserType } from '../../server-types/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getLastVisits } from './lastVisited.controller';
import json from 'koa-json';

const createOneUser = async (ctx: Koa.Context) => {
  const body = <UserType>ctx.request.body;

  const existingUserByEmail = await prisma.user.findUnique({
    where: { email: body.email },
  });

  const existingUserByUsername = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (existingUserByEmail || existingUserByUsername) {
    ctx.status = 409;
    ctx.body = { error: '409', message: 'User already exists' };
    return;
  }

  try {
    if (body.password === '') throw new Error('Password cannot be empty');

    const hash = await bcrypt.hash(body.password, 10);

    const user: UserType = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hash,
        filter_preference: 'top rated',
      },
    });

    const accessToken = jwt.sign(user, process.env.SECRET_KEY!);

    ctx.status = 201;
    ctx.body = {
      accessToken: accessToken,
      userId: user.id,
      email: user.email,
      username: user.username,
      filter_preference: user.filter_preference
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

const loginUser = async (ctx: Koa.Context) => {
  const body = <UserType>ctx.request.body;
  try {
    const user: UserType | null = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
      return;
    }
    const validatedPass = await bcrypt.compare(body.password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign(user, process.env.SECRET_KEY!);
    ctx.status = 200;
    ctx.body = {
      accessToken: accessToken,
      userId: user.id,
      email: user.email,
      username: user.username,
      filter_preference: user.filter_preference
    };
  } catch (error) {
    console.error(error);
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
};

const getOneUser = async (ctx: Koa.Context) => {
  try {
    const user = await prisma.user.findUnique({
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

const getUsernameByID = async (ctx: Koa.Context) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(ctx.params.id) },
    });
    ctx.status = 200;
    ctx.body = user?.username;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

const deleteUser = async (ctx: Koa.Context) => {
  if (verifyUser(ctx.request.body.token, Number(ctx.params.id))) {
    try {
      const userId = Number(ctx.params.id);
      const user = await prisma.user.delete({where: {id: userId}})
      ctx.status = 200;
      ctx.body = 'Deleted';
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Server error' };
    }
  } else {
    ctx.response.status = 500;
    ctx.response.body = "Access denied."
  }
};

const getProfile = async (ctx: Koa.Context) => {
  const userId: number = ctx.request.body.userId;
  if (verifyUser(ctx.request.body.token, userId)) {
    try {
      const userName = (await prisma.user.findUnique({
        where: {id: userId}
      }))?.username;

      const userEntries = await prisma.entry.findMany({
        where: {authorId: userId}
      });

      const userComments = await prisma.comment.findMany({
        where: {commenterId: userId}
      });

      const userRatings = await prisma.rating.findMany({
        where: {raterId: userId}
      });

      ctx.response.status = 200;
      ctx.response.body = {userName, userEntries, userComments, userRatings} 
    } catch (error) {
      console.log('Error retrieving user data (getProfile)', error);
      ctx.response.status = 500;
      ctx.response.body = "Error"
    }
  } else {
    ctx.response.status = 500;
    ctx.response.body = "Access denied."
  }
}

const setUserFilterPreference = async (ctx: Koa.Context) => {
  if (verifyUser(ctx.request.body.token, Number(ctx.params.id))) {
    const body = <UserType>ctx.request.body;
    try {
      const preference = await prisma.user.update({
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
  } else {
    ctx.response.status = 401;
    ctx.response.body = "Access denied."
  }
};

const updatePassword = async (ctx: Koa.Context) => {
  console.log('backend update pass hit')
  if (verifyUser(ctx.request.body.token, Number(ctx.params.id))) {
    const {newPassword, oldPassword} = ctx.request.body;

    if (newPassword === '') throw new Error('Password cannot be empty');
    const hash = await bcrypt.hash(newPassword, 10);
    try {
      const user = await prisma.user.findUnique({where: {id: Number(ctx.params.id)}})
      const validatedPass = await bcrypt.compare(oldPassword, user?.password || "");
      if (!validatedPass || !user) throw new Error("Incorrect existing password.");
      const accessToken = jwt.sign(user, process.env.SECRET_KEY!);

      const updated = await prisma.user.update({
        where: { id: Number(ctx.params.id) },
        data: { password:  hash},
      });

      ctx.status = 201;
      ctx.body = accessToken;
    } catch (error: any) {
      if (error.message == 'Password cannot be empty' || 'Incorrect existing password.') {
        ctx.body = error
        ctx.status = 400;
      } else {
        console.error(error);
        ctx.status = 500;
        ctx.body = 'Error updating password';
      }
    }
  } else {
    ctx.response.status = 401;
    ctx.response.body = "Access denied."
  }
};

const updateUsername = async (ctx: Koa.Context) => {
  if (verifyUser(ctx.request.body.token, Number(ctx.params.id))) {
    const username: string = ctx.request.body.newUsername;
    try {
      const updated = await prisma.user.update({
        where: { id: Number(ctx.params.id) },
        data: { username },
      });
      ctx.status = 201;
      ctx.body = "OK";
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Server error' };
    }
  } else {
    ctx.response.status = 401;
    ctx.response.body = "Access denied."
  }
};

const getUserFilterPreference = async (ctx: Koa.Context) => {
  try {
    const user = await prisma.user.findUnique({
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
  ctx.body = { accesToken: null };
};

const verifyUser = (token: string, userId: number) => {
  try {
    var decoded = jwt.verify(
      token,
      process.env.SECRET_KEY!,
    );
    return (decoded as UserType).id == userId;
  } catch (error) {
    return false;
  }
};

export {
  createOneUser,
  getOneUser,
  getUsernameByID,
  setUserFilterPreference,
  getUserFilterPreference,
  deleteUser,
  loginUser,
  logoutUser,
  verifyUser,
  getProfile,
  updateUsername,
  updatePassword,
};
