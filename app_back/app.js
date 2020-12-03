const Koa = require('koa');
const logger = require('koa-logger');
const router = require('./apis');
const KoaBody = require('koa-body');
const scheduleCronstyle = require('./utils/schedule');

const app = new Koa();

const port = process.env.NODE_ENV === 'development' ? 3010 : 3000;

app.use(logger());

app.use(
  KoaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024
    },
    patchKoa: true
  })
);

app.use(router.routes(),  router.allowedMethods());

app.listen(port);
scheduleCronstyle(); // 定时清空图片任务

console.log(`Local: http://localhost:${port}`);
