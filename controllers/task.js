import errorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask=async(req,res,next)=>{

    try {
        const {title, description} = req.body;

        await Task.create({
            title,
            description,
            user:req.user,
        });

        res.status(201).json({
            success:true,
            message:"task added succcessfully",
        });
    } catch (error) {
        next(error);
    }
}

export const getMyTask= async(req,res,next)=>{
    try {
        const userid= req.user._id;

        const tasks = await Task.find({user:userid})

        res.status(200).json({
            success:true,
            tasks,
        })
    } catch (error) {
        next(error);
    }
};

export const updateTask= async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id);

        if(!task) return next(new errorHandler("task not found",404));
    
        task.isCompleted = !task.isCompleted;
        await task.save();
    
        res.status(200).json({
            success:true,
            message:"task updated",
        }) 
    } catch (error) {
        next(error)
    }
};

export const deleteTask= async(req,res,next)=>{
   try {
        const task = await Task.findById(req.params.id);

        if(!task) return next(new errorHandler("invalid id",404));

        await task.deleteOne();
        res.status(200).json({
            success:true,
            message:"task updated",
        })
   } catch (error) {
        next(error);
   }
}