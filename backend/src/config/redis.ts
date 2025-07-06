import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";
import "dotenv/config"

const REDIS_DB_URI = process.env.REDIS_DB_URI || 'localhost'; 
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);

function connectRedis(){
    let redisClient = createClient({
      username: 'default',
      password: process.env.REDIS_PASS,
      socket: {
          host: REDIS_DB_URI,
          port: REDIS_PORT
      }
    });

    redisClient.connect().catch(console.error)

    return redisClient;
}


export const redisStore = new RedisStore({
  client: connectRedis(),
  prefix: "myapp:",
})

const sessionObj = session({
    store: redisStore,
    resave: false, 
    saveUninitialized: false, 
    secret: "keyboardcat",
  })
 export default sessionObj;