const path = require('path');
const fs = require('fs');
const router = require('koa-router')();
const images = require("images");
const { v4: uuidv4 } = require('uuid');

const baseURL = process.env.NODE_ENV === 'development' ? '/compress-images' : '/compress-images'

// TODO: 超大尺寸时报错
// images.setLimit(100000, 100000);

router.post('/tiny_upload', async (ctx) => {
  const file = ctx.request.files.file;
  const extname = path.extname(file.name);
  const { quality } = ctx.request.body;
  const filename = uuidv4() + extname;
  const filepath = path.join(__dirname, '../compress-images', filename);
  
  images(file.path).save(filepath, {
    quality: parseInt(quality)
  });
  const size = fs.statSync(filepath).size;

  fs.unlink(file.path, (err) => {
    if (err) {
      throw err;
    }
  })
  ctx.set('Content-Type', 'application/json');
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      base: baseURL,
      filename,
      size
    }
  };
});

module.exports = router;