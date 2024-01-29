"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastVisits = exports.setLastVisit = void 0;
const lastVisit_client = require('../models/db');
const setLastVisit = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    try {
        const mission = yield lastVisit_client.LastVisited.create({
            data: {
                userId: body.userId,
                placeId: body.placeId,
            },
        });
        ctx.status = 201;
        ctx.body = mission;
    }
    catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Server error' };
    }
});
exports.setLastVisit = setLastVisit;
const getLastVisits = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const missions = yield lastVisit_client.LastVisited.findMany({
            where: { id: Number(ctx.params.id) },
        });
        ctx.status = 200;
        ctx.body = missions;
    }
    catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Server error' };
    }
});
exports.getLastVisits = getLastVisits;
