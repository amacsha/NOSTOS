import prisma from '../models/db';
import Koa from 'koa';

import { rating } from '../../server-types/types';
import { verifyUser } from './user.controller';

const getUserRating = async (ctx: Koa.Context) => {
  try {
    const rating = <rating>await prisma.rating.findUnique({
      where: {
        raterId_entryId: {
          raterId: Number(ctx.params.userID),
          entryId: Number(ctx.params.entryID),
        },
      },
    });
    ctx.response.status = 200;
    ctx.body = rating;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = 'Error: could not find rating';
  }
};

const getNumberOfRatingsForAnEntry = async (ctx: Koa.Context) => {
  try {
    const count = await prisma.rating.count({
      where: { entryId: Number(ctx.params.entryID) },
    });
    ctx.response.body = count;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = 'Error';
  }
};

const getAvgEntryRating = async (ctx: Koa.Context) => {
  try {
    const avg = await prisma.rating.aggregate({
      where: {
        entryId: Number(ctx.params.entryID),
      },
      _avg: {
        value: true,
      },
    });

    ctx.body = avg;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = 'Error: could not find rating';
  }
};

const getAvgInPlace = async (ctx: Koa.Context) => {
  try {
    const entryIds = (
      await prisma.entry.findMany({
        where: {
          placeId: ctx.params.placeID,
        },
      })
    ).map(entry => entry.id);

    const ratings = await prisma.rating.groupBy({
      by: ['entryId'],
      where: {
        entryId: { in: entryIds },
      },
      _avg: {
        value: true,
      },
    });

    ctx.body = ratings;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = 'Error: could not find rating';
  }
};

const getAvgInCity = async (ctx: Koa.Context) => {
  try {
    const cityPlaceIds = (
      await prisma.place.findMany({
        where: {
          city: ctx.params.cityName,
        },
      })
    ).map(place => place.id);

    const entryIds = (
      await prisma.entry.findMany({
        where: {
          placeId: {
            in: cityPlaceIds,
          },
        },
      })
    ).map(entry => entry.id);

    const ratings = await prisma.rating.groupBy({
      by: ['entryId'],
      where: {
        entryId: { in: entryIds },
      },
      _avg: {
        value: true,
      },
    });

    ctx.body = ratings;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = 'Error: could not find rating';
  }
};

const setUserRating = async (ctx: Koa.Context) => {
  const { raterId, entryId, value } = <rating>ctx.request.body;

  if (verifyUser(ctx.request.body.token, raterId)) {
    try {
      const newRating = <rating>await prisma.rating.upsert({
        where: {
          raterId_entryId: {
            raterId,
            entryId,
          },
        },
        update: { value },
        create: { raterId, entryId, value },
      });
      ctx.body = newRating;
    } catch (err) {
      console.log(err);
      ctx.status = 400;
      ctx.body = 'Error: could not set rating';
    }
  } else {
    ctx.response.status = 401;
    ctx.response.body = 'Access denied.';
  }
};

const getAverageRatingsForUsersEntries = async (ctx: Koa.Context) => {
  try {
    const entryIds = (
      await prisma.entry.findMany({
        where: {
          authorId: Number(ctx.params.userId),
        },
      })
    ).map(entry => entry.id);

    const rating = await prisma.rating.aggregate({
      where: {
        entryId: { in: entryIds },
      },
      _avg: {
        value: true,
      },
    });

    ctx.body = rating._avg.value;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = 'Error.';
  }
}

export {
  getAverageRatingsForUsersEntries,
  getAvgEntryRating,
  getUserRating,
  setUserRating,
  getAvgInCity,
  getAvgInPlace,
  getNumberOfRatingsForAnEntry,
};
