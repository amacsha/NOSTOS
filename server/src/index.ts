import Koa from 'koa';
const app = new Koa();

const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser');
const koaRouter = require('./router');

app.use(cors())
   .use(bodyParser())
   .use(koaRouter.routes())
   .use(koaRouter.allowedMethods());


const port = 3000;

app.listen(port, () => {
	console.log('Server running on ' + port);
   setInterval(() => {
      console.log('10 secs')
   }, 1000 * 10)
})


module.exports = app