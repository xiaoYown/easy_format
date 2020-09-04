const Koa = require('koa');
const router = require('./apis');
const koaBody = require('koa-body');

const app = new Koa();

app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024
    },
    patchKoa: true
  })
);

app.use(router.routes(),  router.allowedMethods());

app.listen(3002);

console.log('Local: http://localhost:3002')
