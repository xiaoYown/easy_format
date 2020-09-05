const path = require('path');
const Koa = require('koa');
const serve = require('koa-better-serve');

const app = new Koa();

const static = path.join(__dirname, '../compress-images');

app.use(serve(static, '/static/compress-images'));

app.listen(3004);


console.log('file serve 3004');
