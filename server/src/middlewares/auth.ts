import Koa from 'koa';
const jwt = require("jsonwebtoken");
const auth_client = require('../models/db');
const SECRET_KEY = process.env.SECRET_KEY

const authMiddleware = async (ctx: Koa.Context, next: any) => {
  const authHeaders: any = ctx.headers["authorization"];
  if (!authHeaders) {
    ctx.status = 403
  }
  const token = authHeaders.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await auth_client.findOne({ _id });
    if (!user) {
      ctx.status = 401;
    } 
    ctx.body = user;
    next();
  } catch (error) {
    console.error(error);
    ctx.status = 401;
    ctx.body = { error: 'Server error' };
  }
};

export {authMiddleware}