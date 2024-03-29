import prisma from '../models/db'
import Koa from 'koa'

import { Place, newEntry, SmallEntry, entry } from '../../server-types/types'
import { verifyUser } from './user.controller';

const postEntry = async (ctx: Koa.Context) => {
    console.log(ctx.request.body)
    if (verifyUser(ctx.request.body.token, ctx.request.body.userId)) {
        try {
            let data: newEntry = {
                placeId: ctx.request.body.newEntry.placeId,
                authorId: ctx.request.body.newEntry.authorId,
                title: ctx.request.body.newEntry.title,
                content: ctx.request.body.newEntry.content,
                tag: ctx.request.body.newEntry.tag
            }
            const newEntry = await prisma.entry.create({
                data
            });

            ctx.response.status = 201;
            ctx.body = newEntry;
        } catch (err) {
            console.log(err)
            ctx.status = 400
            ctx.body = 'Error: could not create new entry'
        }
    } else {
        console.log('auth error')
        ctx.response.status = 401;
        ctx.response.body = "Access denied."
    }
}

const getManyEntries = async (ctx: Koa.Context) => {
    try {
        const entryIds: number[] = ctx.request.body;
        const entries = await Promise.all(entryIds.map(async id => await prisma.entry.findFirst({ where: { id } })));

        ctx.response.status = 200;
        ctx.response.body = entries;
    } catch (err) {
        console.log(err)
        ctx.status = 400
        ctx.body = 'Error finding entries.'
    }
}

const getEntry = async (ctx: Koa.Context) => {
    try {
        const entry = await prisma.entry.findUnique({
            where: {
                id: Number(ctx.params.entryID),
            },
        });
        ctx.body = entry;

    } catch (err) {
        console.log(err)
        ctx.status = 400
        ctx.body = 'Error: could not find entry'
    }
}

const sortByRatings = async (entries: SmallEntry[]) => {
    const ratings = await prisma.rating.groupBy({
        by: ['entryId'],
        _avg: {
            value: true
        }
    })
    return entries.sort((a, b) => {
        return (ratings.find(rating => rating.entryId == b.id)?._avg.value || 0) - (ratings.find(rating => rating.entryId == a.id)?._avg.value || 0)
    })
}

const getPlaceEntries = async (ctx: Koa.Context) => {
    try {
        let entries = <SmallEntry[]>await prisma.entry.findMany({
            where: {
                placeId: ctx.params.placeID,
            },
            select: {
                "authorId": true,
                "title": true,
                "creation_date": true,
                "tag": true,
                "id": true,
            },
            orderBy: ctx.params.sortPrefrence == 'recent' ? { creation_date: 'desc' } : undefined
        })

        ctx.body = ctx.params.sortPrefrence == 'top rated' ? await sortByRatings(entries) : entries;

    } catch (err) {
        console.log(err)
        ctx.status = 400
        ctx.body = 'Error: could not find entry'
    }
}

const getCityEntries = async (ctx: Koa.Context) => {
    try {
        const cityPlaces = <Place[]>await prisma.place.findMany({
            where: {
                city: ctx.params.cityName
            }
        });
        const placesIds = cityPlaces.map((place: Place) => place.id)
        const entries = <SmallEntry[]>await prisma.entry.findMany({
            where: {
                placeId: {
                    in: placesIds
                }
            },
            select: {
                "authorId": true,
                "title": true,
                "creation_date": true,
                "tag": true,
                "id": true,
            },
            orderBy: ctx.params.sortPrefrence == 'recent' ? { creation_date: 'desc' } : undefined
        });
        ctx.body = ctx.params.sortPrefrence == 'top rated' ? await sortByRatings(entries) : entries;

    } catch (err) {
        console.log(err)
        ctx.status = 400
        ctx.body = 'Error: could not find entry'
    }
}

const deleteEntry = async (ctx: Koa.Context) => {
    if (verifyUser(ctx.request.body.token, ctx.request.body.userId)) {
        try {
            const deleteEntry = await prisma.entry.delete({
                where: {
                    id: ctx.params.entryID,
                    authorId: ctx.request.body.userId
                },
            })
            ctx.body = deleteEntry;
        } catch (err) {
            console.log(err)
            ctx.status = 400
            ctx.body = 'Error: could not delete entry'
        }
    } else {
        ctx.response.status = 401;
        ctx.response.body = 'Access denied.'
    }
}

export { getEntry, getManyEntries, postEntry, getCityEntries, getPlaceEntries, deleteEntry }