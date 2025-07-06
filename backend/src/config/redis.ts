import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";

function connectRedis(){
    let redisClient = createClient({
      username: 'default',
      password: 'suGH8phqLW2OMqWaqlbrCif3ADNaJFVp',
      socket: {
          host: 'redis-18286.c52.us-east-1-4.ec2.redns.redis-cloud.com',
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

const sessionObj = session({
    store: redisStore,
    resave: false, 
    saveUninitialized: false, 
    secret: "keyboardcat",
  })
 export default sessionObj;