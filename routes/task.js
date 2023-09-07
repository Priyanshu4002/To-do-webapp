import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/authenticated.js";

const router= express.Router();

router.post("/info",isAuthenticated,newTask);
router.get("/myTask",isAuthenticated,getMyTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)
export default router;