"use strict";
import _ from 'underscore'
import { Context } from 'koa';
import db from '../models/db';
import {Place, NewPlace} from '../../server-types/types'

export async function addNewPlace(ctx: Context): Promise<void> {
    const { id, lat, lng, name, city } = <NewPlace> ctx.request.body;
    try {
        await db.place.create({
            data: { id, lat, lng, name, city }
        });
        ctx.response.status = 201;
        ctx.response.body = 'OK';
    } catch (error) {
        console.log(error);
    }
}

export async function addManyPlaces(ctx: Context): Promise<void> {
    const newPlaces = <NewPlace[]> ctx.request.body;

    try {
        await db.place.createMany({
            data: newPlaces
        });
        ctx.response.status = 201;
        ctx.response.body = 'OK';
    } catch (error) {
        console.log(error);
    }
}

export async function getAllPlaces(ctx: Context): Promise<void> {
    try {
        const places = await db.place.findMany();
        ctx.response.status = 200;
        ctx.response.body = places;
    } catch (error) {
        console.log(error);
    }
}

export async function getPlacesForCity(ctx: Context): Promise<void> {
    const city = ctx.params.cityName;
    try {
        const places = await db.place.findMany({
            where: {
                city: city
            }
        })
        ctx.response.status = 200;
        ctx.response.body = places;
    } catch (error) {
        console.log(error);
    }
}

export async function getSamplePlacesForCity(ctx: Context): Promise<void> {
    const city = ctx.params.cityName;
    try {
        const places = await db.place.findMany({
            where: {
                city: city
            }
        })
        ctx.response.status = 200;
        ctx.response.body = _.sample(places, Number(ctx.params.numOfPlaces));
    } catch (error) {
        console.log(error);
    }
}

export async function getRecentPlaces(ctx: Context): Promise<void> {
    try {
        const cutoffTime = new Date()
        cutoffTime.setHours(cutoffTime.getHours() - 48);
        
        const missionsIds = (await db.lastVisited.findMany({
        where: { 
            userId: Number(ctx.params.userId) ,
                visit_time: {
                    gte: cutoffTime
                },
            },
        })).map((mission) => mission.placeId);
        
        const recent = await db.place.findMany({
            where: {
                id: {
                    in : missionsIds
                }
            }
        })
        ctx.response.status = 200;
        ctx.response.body = recent;
    } catch (error) {
        console.log(error);
    }
}

export async function getCityNames(ctx: Context): Promise<void> {
    try {
        const distinctCities = await db.place.findMany({
            distinct: ['city'],
            select: {
              city: true,
            },
          })
        ctx.response.status = 200;
        ctx.response.body = distinctCities.map(city => city.city);
    } catch (error) {
        console.log(error);
    }
}