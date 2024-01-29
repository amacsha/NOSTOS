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
exports.deleteComment = exports.getAllCommentsByEntry = exports.addNewComment = void 0;
const db_1 = __importDefault(require("../models/db"));
function addNewComment(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commenterId, entryId, content } = ctx.request.body;
        console.log('Creating new comment.');
        console.time('🟢 Success! Completed in');
        try {
            const comment = yield db_1.default.comment.create({
                data: {
                    commenterId,
                    entryId,
                    content
                }
            });
            console.timeEnd('🟢 Success! Completed in');
            ctx.status = 201;
            ctx.response.body = 'Created';
        }
        catch (error) {
            console.log('Error creating comment.\n', `CommenterId: ${commenterId}\nEntryId: ${entryId}\nContent:${content}`);
            console.log(error);
        }
    });
}
exports.addNewComment = addNewComment;
function getAllCommentsByEntry(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Getting all comments for entry.');
        console.time('🟢 Success! Completed in');
        try {
            const comments = yield db_1.default.comment.findMany({
                where: {
                    entryId: Number(ctx.params.entryId)
                }
            });
            ctx.response.status = 200;
            ctx.response.body = comments;
            console.timeEnd('🟢 Success! Completed in');
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getAllCommentsByEntry = getAllCommentsByEntry;
function deleteComment(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Deleting comment.');
        console.time('🟢 Success! Completed in');
        try {
            yield db_1.default.comment.delete({
                where: {
                    commenterId_entryId: {
                        commenterId: Number(ctx.params.commenterId),
                        entryId: Number(ctx.params.entryId)
                    }
                }
            });
            console.timeEnd('🟢 Success! Completed in');
            ctx.response.status = 200;
            ctx.response.body = 'Deleted';
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.deleteComment = deleteComment;
