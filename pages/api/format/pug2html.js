// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pug from 'pug';
// const pug = require('pug');

export default (req, res) => {
  const { text } = req.body;
  let html = '';
  let code = 0;
  try {
    html = pug.compile(text)();
  } catch (err) {
    code = 10001;
    console.log(err);
  }
  res.statusCode = 200;
  res.json({
    code,
    data: { html }
  });
}
