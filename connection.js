const { MongoClient } = require('mongodb');
const redis = require('async-redis');

class Database{
    constructor(){
        this.mongoClient = new MongoClient(process.env.DB,{useUnifiedTopology:true});
        this.redisClient = null;
        this.mongoInit();
        this.redisInit();
    }
    async mongoInit(){
        await this.mongoClient.connect();
        this.mongo = this.mongoClient.db(process.env.DB_NAME);
        console.log("===== mongo connected =====");
    }

    async redisInit(){
        this.redisClient = redis.createClient({
            host:process.env.REDIS_HOST,
            port:process.env.REDIS_PORT,
            password:process.env.REDIS_PASSWORD
        });
        console.log("===== redis connected =====");
    }
}

module.exports = new Database();