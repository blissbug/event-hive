import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/db";
import UserRouter from "./routes/User";
import session from "express-session";
import MongoStore from "connect-mongo";
import encryptKey from "./utils/encrypt";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        message:"reached!"
    })
})

encryptKey("tyyy");

app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: false,
  store:MongoStore.create({
    mongoUrl:process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60, //time-to-live - automatic removal
    autoRemove: 'interval', 
    autoRemoveInterval: 10, 
    touchAfter: 24 * 3600 
  }),
  cookie: { 
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000
  }
}));
//routes
app.use('/api/user',UserRouter);

connectDB();

app.listen(8080,()=>{
    console.log("app is active at 8080")
})