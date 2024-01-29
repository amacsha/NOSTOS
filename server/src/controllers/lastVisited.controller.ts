import Koa from 'koa';
const lastVisit_client = require('../models/db');
import { LastVisited } from '../../server-types/types';

const setLastVisit = async (ctx: Koa.Context) => {
  const body = <LastVisited>ctx.request.body;
  try {
    const mission = await lastVisit_client.LastVisited.create({
      data: {
        userId: body.userId,
        placeId: body.placeId,
      },
    });
    ctx.status = 201;
    ctx.body = mission;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

const getLastVisits = async (ctx: Koa.Context) => {
  try {
    const missions = await lastVisit_client.LastVisited.findMany({
      where: { id: Number(ctx.params.id) },
    });
    ctx.status = 200;
    ctx.body = missions;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

export { setLastVisit, getLastVisits };
