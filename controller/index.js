const router = require('express').Router();
const shorten = require('./shorten');

router.get('/',async(req,res)=>{
    const {db} = req.app.locals;
    const response = await db.collection('links').find().toArray()
    res.send(response);
})
router.post('/api/v1/short',shorten.create);
router.get('/api/v1/redirect',shorten.redirect);

module.exports = router