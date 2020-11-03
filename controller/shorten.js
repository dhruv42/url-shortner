const encodeDecode = require('../helper/encode-decode');
const handleResponse = require('../helper/handleResponse');
const constants = require('../constants.json');

const create = async (req, res) => {
    try {
        const { db, counter } = req.app.locals;
        console.log(counter);

        const result = await db.collection('links').findOneAndUpdate(
            { destination: req.body.destination },
            {
                $setOnInsert: {
                    index: counter,
                    destination: req.body.destination,
                    slug: encodeDecode.base62Encode(counter)
                }
            }, { upsert: true, returnOriginal: false }
        );
        if (!result.lastErrorObject.updatedExisting) req.app.locals.counter++
        res.status(constants.statusCode.OK)
            .send(handleResponse.success(
                constants.statusCode.OK,
                constants.messages.SUCCESS,
                {data:result.value}
            ));

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