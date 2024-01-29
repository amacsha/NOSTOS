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
const user_client = require('../models/db');
const createOneUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_client.user.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = user;
    }
    catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Server error' };
    }
});
// const getOneUser = async (ctx) => {
//   try {
//     const user = await user_client.user.findUnique({
//       where: {
//         id: ctx.params.id,
//       },
//     });
//     // ctx.status =
//     ctx.body = user;
//   } catch (error) {
//     console.error(error);
//     ctx.status = 500;
//     ctx.body = { error: 'Server error' };
//   }
// };
// const setUserFilterPreference = async (ctx) => {
//     try {
//         const user = await prisma.user.update({
//             where: { id: ctx.params.id },
//             data: { ctx.request.body },
//           })
//     } catch (error) {
//     }
// }
// const getActiveMissions = async (ctx) => {
// }
module.exports = createOneUser;
