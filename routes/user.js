import express  from "express";
import { getUserDetails, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/authenticated.js";


const router= express.Router();

router.post("/new",register);

router.post("/login",login);

router.get("/logout",logout);

router.get("/me",isAuthenticated,getUserDetails);


export default router;