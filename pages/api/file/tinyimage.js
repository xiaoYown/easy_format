// import images from 'images';
// import path from 'path';
const images = require("images");
const multiparty = require('multiparty');
const formidable = require('formidable')
const { IncomingForm } = formidable;
const bodyParser = require('body-parser');

export default (req, res) => {
  let code = 0;
  console.log(Object.keys(req))
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    filename: 'file'
  });
  form.parse(req, (err, fields, files) => {
    console.log(err)
    console.log(fields, files)
  });
  // let form = new multiparty.Form()
  // form.parse(req, (err, fields, files) => {
  //   console.log(err, fields, files)
  // })
  res.statusCode = 200;
  res.json({
    code,
    data: {}
  });
}

// images('input.jpg')
//   .save('output.jpg', {
//     quality : 80
//   });
