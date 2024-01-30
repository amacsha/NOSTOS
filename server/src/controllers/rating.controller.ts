import prisma from '../models/db'
import Koa from 'koa'

import { rating } from '../../server-types/types'

const getUserRating = async (ctx : Koa.Context) => {
    try {
        const rating = <rating> await prisma.rating.findUnique({
            where: {
                raterId_entryId : {
                    raterId: Number(ctx.params.userID),
                    entryId: Number(ctx.params.entryID),
                }
            },
        });
        ctx.body = rating;

    } catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could not find rating';
    }
}

const getAvgEntryRating = async (ctx : Koa.Context) => {
    try {
        const avg =  await prisma.rating.aggregate({
            where: {
                entryId: Number(ctx.params.entryID)
            }, 
            _avg: {
                value: true
            }
        })
        ctx.body = avg

    } catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could not find rating';
    }
}

const setUserRating = async (ctx : Koa.Context) => {
    try {
        const {raterId, entryId, value} = <rating> ctx.request.body
        const newRating = <rating> await prisma.rating.upsert({
            where: {
                raterId_entryId: {
                    raterId,
                    entryId
                }
            },
            update: {value},
            create: {raterId, entryId, value},
        });
        ctx.body = newRating
    } catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could not set rating';
    }
}

export {getAvgEntryRating, getUserRating, setUserRating}