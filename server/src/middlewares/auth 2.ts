import Koa from 'koa';
const auth_client = require('../models/db');

const authMiddleware = async (ctx: Koa.Context, next: any) => {
  try {
    const { uid } = ctx.session;
    const user = await auth_client.user.findUnique({ id: uid });
    if (!user) throw new Error();
    ctx.user = user;
    next();
  } catch (error) {
    console.error(error);
    ctx.status = 401;
    ctx.body = { error: 'Server error' };
  }
};

export {authMiddleware}