require('dotenv').config()
const express = require('express');
const routes = require('./controller');
const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/', routes);

app.locals.counter = 100;

require('./connection');
app.listen(PORT, () => {
    console.log(`----- Server listening on port - ${PORT} ------`);
})


module.exports = app