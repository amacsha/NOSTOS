"use strict";
<<<<<<< HEAD
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaceEntries = exports.getCityEntries = exports.postEntry = exports.getEntry = void 0;
const db_1 = __importDefault(require("../models/db"));
const postEntry = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx.request.body);
    try {
        const newEntry = yield db_1.default.entry.create({
            data: ctx.request.body,
        });
        ctx.body = newEntry;
    }
    catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could not create new entry';
    }
});
exports.postEntry = postEntry;
const getEntry = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entry = yield db_1.default.Entry.findUnique({
            where: {
                id: Number(ctx.params.entryID),
            },
        });
        ctx.body = entry;
    }
    catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could find entry';
    }
});
exports.getEntry = getEntry;
const getPlaceEntries = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entries = yield db_1.default.entry.findMany({
            where: {
                placeId: Number(ctx.params.placeID),
            },
            select: {
                "authorId": true,
                "title": true,
                "creation_date": true,
                "tag": true
            }
        });
        ctx.body = entries;
    }
    catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could find entry';
    }
});
exports.getPlaceEntries = getPlaceEntries;
const getCityEntries = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cityPlaces = yield db_1.default.place.findMany({
            where: {
                city: ctx.params.cityName
            }
        });
        const placesIds = cityPlaces.map((place) => place.id);
        const entry = yield db_1.default.entry.findMany({
            where: {
                placeId: {
                    in: placesIds
                }
            },
            select: {
                "authorId": true,
                "title": true,
                "creation_date": true,
                "tag": true
            }
        });
        ctx.body = entry;
    }
    catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could find entry';
    }
});
exports.getCityEntries = getCityEntries;
=======
>>>>>>> dev
