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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlaces = exports.addNewPlace = void 0;
const db_1 = __importDefault(require("../models/db"));
function addNewPlace(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Creating new place.');
        console.time('🟢 Success! Completed in');
        const { lat, lng, name, city } = ctx.request.body;
        try {
            yield db_1.default.place.create({
                data: { lat, lng, name, city }
            });
            console.timeEnd('🟢 Success! Completed in');
            ctx.response.status = 201;
            ctx.response.body = 'OK';
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.addNewPlace = addNewPlace;
function getAllPlaces(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Getting all places.');
        console.time('🟢 Success! Completed in');
        try {
            const places = yield db_1.default.place.findMany();
            console.timeEnd('🟢 Success! Completed in');
            ctx.response.status = 200;
            ctx.response.body = places;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getAllPlaces = getAllPlaces;
