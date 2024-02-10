"use strict";
import { Context } from 'koa';
import db from '../models/db';
import { Comment } from '../../server-types/types';
import { verifyUser } from './user.controller';

export async function addNewComment(ctx: Context): Promise<void> {
  const { commenterId, content } = <Comment> ctx.request.body;
  if (verifyUser(ctx.request.body.token, commenterId)){
    try {
      const comment = await db.comment.upsert({
        where: {
          commenterId_entryId: {
            commenterId: commenterId,
            entryId: Number(ctx.params.entryId)
          }
          }
        ,
        update: {
          content: content
        },
        create: {
          commenterId,
          entryId: Number(ctx.params.entryId),
          content
        }
      });

      ctx.status = 201;
      ctx.response.body = 'Created';
    } catch (error) {
      console.log('Error creating comment.\n', `CommenterId: ${commenterId}\nEntryId: ${ctx.params.entryId}\nContent:${content}`);
      console.log(error);
    }
  } else {
    ctx.status = 401;
    ctx.response.body = "Access denied."
  }
}

export async function getAllCommentsByEntry(ctx: Context): Promise<void> {
  try {
    const comments = await db.comment.findMany({
      where: {
        entryId: Number(ctx.params.entryId)
      }
    });
    ctx.response.status = 200;
    ctx.response.body = comments;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteComment(ctx: Context): Promise<void> {
  if (verifyUser(ctx.request.body.token, ctx.params.commenterId)) {
    try {
      await db.comment.delete({
        where: {
          commenterId_entryId: {
            commenterId: Number(ctx.params.commenterId),
            entryId: Number(ctx.params.entryId)
          }
        }
      });
      ctx.response.status = 200;
      ctx.response.body = 'Deleted';
    } catch (error) {
      console.log(error);
    }
  } else {
    ctx.response.status = 401;
    ctx.response.body = "Access denied."
  }
}