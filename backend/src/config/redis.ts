import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";
import "dotenv/config"

function connectRedis(){
    let redisClient = createClient({
      username: 'default',
      password: process.env.REDIS_PASS,
      socket: {
          host: process.env.REDIS_DB_URI,
          port: 18286
      }
    });

    redisClient.connect().catch(console.error)

    return redisClient;
}


export const redisStore = new RedisStore({
  client: connectRedis(),
  prefix: "myapp:",
})

const redisSession = session({
    store: redisStore,
    resave: false, 
    saveUninitialized: false, 
    secret: "keyboardcat",
  })
 export default redisSession;