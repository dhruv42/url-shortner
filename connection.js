/*
* Currently not being used.
*/

const { MongoClient } = require('mongodb');

const connect = async () => {
    try {
        const dbConnection = new MongoClient(process.env.DATABASE_URL, { useUnifiedTopology: true })
        await dbConnection.connect();
        app.locals.db = dbConnection.db(process.env.DB_NAME);
        console.log("**************** DB connected successfully ****************");
    } catch (error) {
        console.log(error);
        throw new Error('Can not connect the database');
    }
}

module.exports = {
    connect
}