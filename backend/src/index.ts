import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/db";
import UserRouter from "./routes/User";
import sessionObj from "./config/redis";
import EventRouter from "./routes/Event";
import AccountRouter from "./routes/Account";
import PublicRouter from "./routes/Public";

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
  optionsSuccessStatus: 200 
}));app.use(express.json());

//connect to redis
app.use(
  sessionObj
)

app.get("/",(req,res)=>{
  if (req.session) {
        req.session.views = (req.session.views || 0) + 1;
        res.send(`Views: ${req.session.views}`);
    } else {
        res.send('Session not available');
    }

})

//routes
app.use(PublicRouter);
app.use('/api/user',UserRouter);
app.use('/api/event',EventRouter);
app.use('/api/account',AccountRouter);

app.listen(8080,()=>{
    console.log("app is active at 8080")
})