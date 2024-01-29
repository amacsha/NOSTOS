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
exports.setUserRating = exports.getUserRating = exports.getAvgEntryRating = void 0;
const db_1 = __importDefault(require("../models/db"));
const getUserRating = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rating = yield db_1.default.rating.findUnique({
            where: {
                raterId_entryId: {
                    raterId: Number(ctx.params.userID),
                    entryId: Number(ctx.params.entryID),
                }
            },
        });
        ctx.body = rating;
    }
    catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could not find rating';
    }
});
exports.getUserRating = getUserRating;
const getAvgEntryRating = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avg = yield db_1.default.rating.aggregate({
            where: {
                entryId: Number(ctx.params.entryID)
            },
            _avg: {
                value: true
            }
        });
        ctx.body = avg;
    }
    catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could not find rating';
    }
});
exports.getAvgEntryRating = getAvgEntryRating;
const setUserRating = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { raterId, entryId, value } = ctx.request.body;
        const newRating = yield db_1.default.rating.upsert({
            where: {
                raterId_entryId: {
                    raterId,
                    entryId
                }
            },
            update: { value },
            create: { raterId, entryId, value },
        });
        ctx.body = newRating;
    }
    catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = 'Error: could not set rating';
    }
});
exports.setUserRating = setUserRating;
=======
>>>>>>> dev
