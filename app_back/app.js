const Koa = require('koa');
const router = require('./apis');
const KoaBody = require('koa-body');
const scheduleCronstyle = require('./utils/schedule');

const app = new Koa();

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

app.listen(3002);
scheduleCronstyle(); // 定时清空图片任务

console.log('Local: http://localhost:3002');
