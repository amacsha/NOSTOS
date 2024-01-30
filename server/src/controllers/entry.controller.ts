import prisma from '../models/db'
import Koa from 'koa'

import { Place, newEntry, SmallEntry } from '../../server-types/types'

const postEntry = async (ctx : Koa.Context) => {
    console.log(ctx.request.body)
    try {
        const newEntry = await prisma.entry.create({
            data : <newEntry> ctx.request.body,
        });
    
        ctx.body = newEntry;
    } catch (err) {
        console.log(err)
        ctx.status = 400
        ctx.body = 'Error: could not create new entry'
    }
}

const getEntry= async (ctx : Koa.Context) => {
    try {
        const entry =  await prisma.entry.findUnique({
            where: {
              id: Number(ctx.params.entryID),
            },
        });
        ctx.body = entry;

    } catch (err) {
        console.log(err)
        ctx.status = 400
        ctx.body = 'Error: could find entry'
    }
}



const getPlaceEntries= async (ctx : Koa.Context) => {
    try {
        const entries = <SmallEntry[]> await prisma.entry.findMany({
            where: {
              placeId: Number(ctx.params.placeID),
            },
            select: {
                "authorId": true,
                "title": true,
                "creation_date": true,
                "tag": true,
                "id": true,
            }
        });
        ctx.body = entries;

    } catch (err) {
        console.log(err)
        ctx.status = 400
        ctx.body = 'Error: could find entry'
    }
}

const getCityEntries= async (ctx : Koa.Context) => {
    try {
        const cityPlaces = <Place[]> await prisma.place.findMany({
            where: {
                city: ctx.params.cityName
            }
        });
        const placesIds = cityPlaces.map((place: Place) => place.id)

        const entry = <SmallEntry[]> await prisma.entry.findMany({
            where: {
                placeId: {
                    in : placesIds
                }
            },
            select: {
                "authorId": true,
                "title": true,
                "creation_date": true,
                "tag": true,
                "id": true,
            }
        });
        ctx.body = entry;

    } catch (err) {
        console.log(err)
        ctx.status = 400
        ctx.body = 'Error: could find entry'
    }
}

const deleteEntry = async () => {

}

export {getEntry, postEntry, getCityEntries, getPlaceEntries, deleteEntry}