import html2jade from 'html2jade';
const { minify } = require('html-minifier-terser');

export default (req, res) => {
  const { text } = req.body;
  let pug = '';
  let code = 0;

  html2jade.convertHtml(minify(text, { collapseWhitespace: true }), {}, function (err, jade) {
    if (!err) {
      pug = jade;
    } else {
      code = 10001;
      console.log(err);
    }
    res.statusCode = 200;
    res.json({
      code,
      data: { pug }
    });
  });
}
