import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";


export const register=async(req,res,next)=>{
   try {
        const {name,email,password}=req.body;

        let user= await User.findOne({email});

        if(user) return next(new errorHandler("user already exist",404));

        const hashpassword= await bcrypt.hash(password,10);

        user = await User.create({name,email,password:hashpassword });
        
        setCookie(user, res, "Registered Successfully", 201);
   } catch (error) {
        next(error);
   }
};

export const login = async(req,res,next)=>{
    try {
        const {email,password}=req.body;

        const user= await User.findOne({email}).select("+password");

        if(!user) return next(new errorHandler("invalid Email or Password",404));

        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch) return next(new errorHandler("invalid Email or Password",404));

        setCookie(user, res, `welcome back, ${user.name}`,201);
    } catch (error) {
        next(error);
    }
}

export const getUserDetails = (req,res)=>{

    try {
        res.status(200).json({
            success:true,
            user:req.user,
        });
    } catch (error) {
        next(error)
    }
};

export const logout= (req, res)=>{
    try {        
        res.status(200).cookie("token","",{
            expires:new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" :  "none",
            secure: process.env.NODE_ENV==="Development" ? false : true ,
        })
        .json({
            success:true,
            message:"user logout successfully",
        });
    } catch (error) {
        next(error);
    }
}
