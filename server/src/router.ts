const Router = require('@koa/router')
const router = new Router();

router.get('/', (ctx: any, next: any) => {
	ctx.body = 'Hello Koa';
})

module.exports = router;