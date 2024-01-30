const Koa = require('koa');

const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser');
const koaRouter = require('./router');

const app = new Koa();

app.use(cors())
   .use(bodyParser())
   .use(koaRouter.routes())
   .use(koaRouter.allowedMethods());

const port = 3000;

app.listen(port, () => {
	console.log('Server running on ' + port);
})


module.exports = app