const router = require('koa-router')();
const file = require('./file');
const format = require('./format');

router.use('/api/file', file.routes(), file.allowedMethods());
router.use('/api/format', format.routes(), format.allowedMethods());

module.exports = router;
