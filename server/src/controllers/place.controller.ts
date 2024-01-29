"use strict";

import { Context } from 'koa';
import db from '../models/db';
import {Place, NewPlace} from '../../server-types/types'

export async function addNewPlace(ctx: Context): Promise<void> {
    console.log('Creating new place.');
    console.time('🟢 Success! Completed in');
    const { lat, lng, name, city } = <NewPlace> ctx.request.body;
    try {
        await db.place.create({
            data: { lat, lng, name, city }
        });
        console.timeEnd('🟢 Success! Completed in');
        ctx.response.status = 201;
        ctx.response.body = 'OK';
    } catch (error) {
        console.log(error);
    }
}

export async function getAllPlaces(ctx: Context): Promise<void> {
    console.log('Getting all places.');
    console.time('🟢 Success! Completed in');
    try {
        const places = await db.place.findMany();
        console.timeEnd('🟢 Success! Completed in');
        ctx.response.status = 200;
        ctx.response.body = places;
    } catch (error) {
        console.log(error);
    }
}