import Koa from 'koa';
import prisma from '../models/db'
import { LastVisited } from '../../server-types/types';

const setLastVisit = async (ctx: Koa.Context) => {
  const body = <LastVisited>ctx.request.body;
  try {
    const mission = await prisma.lastVisited.upsert({
      where: {
        userId_placeId: {
          userId: body.userId,
          placeId: body.placeId,
        }
      },
      update: {visit_time: new Date()},
      create: {
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
    const cutoffTime = new Date()
    cutoffTime.setHours(cutoffTime.getHours() - 48);
    const missions = await prisma.lastVisited.findMany({
      where: {
        userId: Number(ctx.params.userId) ,
        visit_time: {
          gte: cutoffTime
        },
      },
    });
    ctx.status = 201;
    ctx.body = missions;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};


const lastVisitCleanupAgent = () => {
  setTimeout(async () => {
    try {
      const cutoffTime = new Date()
      cutoffTime.setHours(cutoffTime.getHours() - 48);
      const oldMissions = await prisma.lastVisited.deleteMany({
        where: {
          visit_time: {
            lte: cutoffTime
          },
        },
      });

      console.log('Deleted:', oldMissions)
    } catch (error) {
      console.log(error);
    }


    lastVisitCleanupAgent();
  }, 1000 * 60 * 30);
}

export { setLastVisit, getLastVisits, lastVisitCleanupAgent};
