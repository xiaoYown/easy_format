const path = require('path');
const fs = require('fs');
const router = require('koa-router')();
const images = require("images");

router.post('/tiny_upload', async (ctx) => {
  const file = ctx.request.files.file;
  const extname = path.extname(file.name);
  images(file.path)
    .save('output' + extname, {
      quality: 80
    });
  fs.unlink(file.path, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Delete file success')
    }
  })
  ctx.set('Content-Type', 'application/json');
  ctx.body = {
    code: 0,
    msg: 'success'
  };
});

module.exports = router;