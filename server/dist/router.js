"use strict";
const Router = require('@koa/router');
const router = new Router();
const createUser = require('./controllers/user.controller');
router.post('/user/createOneUser', createUser);
module.exports = router;
