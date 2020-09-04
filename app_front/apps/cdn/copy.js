const fs = require('fs-extra')
const path = require('path')
 
fs.copy('./cloud', path.resolve('../../dist/cloud'))
  .then(() => console.log('copy CDN source success!'))
  .catch(err => console.error(err))
