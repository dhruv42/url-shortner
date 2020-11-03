require('dotenv').config()
const express = require('express');
const { MongoClient } = require('mongodb');
const routes = require('./controller');
const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.locals.counter = 100;

// require('./connection').connect();

MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true })
    .then(client => {
        app.locals.db = client.db(process.env.DB_NAME);
        console.log("************************** DB connected successfully ****************************");
    })
    .catch(error => {
        console.log(error);
        app.use('/',()=>{
            throw new Error('Something went wrong !');
        })
    }).finally(()=>{
        app.listen(PORT, () => {
            console.log(`-------------------------- Server listening on port - ${PORT} ----------------------`);
        })
        app.use('/', routes);
    })


module.exports = app