const router = require('express').Router();
const shorten = require('./shorten');

router.post('/api/v1/short',shorten.create);
router.get('/api/v1/redirect',shorten.redirect);

module.exports = router