const encodeDecode = require('../helper/encode-decode');
const handleResponse = require('../helper/handleResponse');
const constants = require('../constants.json');
const dbConn = require('../connection');


const create = async (req, res) => {
    try {
        const { mongo,redisClient } = dbConn;
        const { destination } = req.body;
        let [counter,result] = await Promise.all([
            redisClient.get("currKey"),
            mongo.collection('links').find({destination}).toArray()
        ])
        if(result.length){
            return res.status(400).send({message:'Duplicate link'});
        }
        result = await mongo.collection('links').insertOne({
            destination,
            slug:encodeDecode.base62Encode(counter),
            index:counter
        })
        redisClient.incr("currKey");
        return res.status(200).send(result.ops[0]);

    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}


const redirect = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const result = await db.collection('links').findOne({
            slug:req.query.slug
        })
        if(!result) {
            return res.status(constants.statusCode.BAD_REQUEST)
            .send(handleResponse.error(
                constants.statusCode.BAD_REQUEST,
                constants.messages.BAD_REQUEST
            ));
        }

        console.log(`redirecting to --> ${result.destination}`)
        return res.status(constants.statusCode.PERMANENT_REDIRECT).redirect(result.destination);

        
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

module.exports = {
    create, redirect
}