dotenv.config({ path: "./.env" });
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app= express();
// use to connect the frontend and  backend 
app.use(cors({
    origin:"http://localhost:5173",
    credentials :true
}))
const port = process.env.POST|| 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);


// it is samll server actully which run on get method where perfoomr operation of req and res 
// it actully run on / when some one work on that route


// app.get("/",(req,res)=>{
//     res.send("server is running")
// })

// server is listen on this prot and we use call back function that when it listen then what we want to do 
app.listen(port,()=>{
    connectDb();
    console.log(`server is running on port ${port}`)
})