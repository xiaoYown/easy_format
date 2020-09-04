const router = require('koa-router')();
const pug = require('pug');
const html2jade = require('html2jade');
const { minify } = require('html-minifier-terser');

router.post('/pug2html', async (ctx) => {
  const { text } = ctx.request.body;
  let html = '';
  let code = 0;
  try {
    html = pug.compile(text)();
  } catch (err) {
    code = 10001;
    console.log(err);
  }
  ctx.body = {
    code,
    data: { html }
  };
});

router.post('/html2pug', async (ctx) => {
  const { text } = ctx.request.body;
  let pug = '';

  html2jade.convertHtml(minify(text, { collapseWhitespace: true }), {}, function (err, jade) {
    let code = 0;
    if (!err) {
      pug = jade;
    } else {
      code = 10001;
      console.log(err);
    }
    ctx.body = {
      code,
      data: { pug }
    };
  });
});

module.exports = router;