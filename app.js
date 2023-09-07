import express  from "express";
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { customHandler } from "./middlewares/error.js";
import cors from "cors";

export const app= express(); 

config({
    path: "./database/config.env",
});

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));
//using routes

app.use("/api/v1/users",userRoute);
app.use("/api/v1/task",taskRoute);


app.get("/",(req,res)=>{
    res.send("love you priyanshu");
})

app.use(customHandler);
// app.use((err,req,res,next)=>{
//     return res.status(200).json({
//     success:true,
//     message:"task updated",
//     });
// })
