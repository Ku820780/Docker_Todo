import { userLogin, userLogout, userRegister } from "../controller/user.controller.js";
import db from "../utils/db.js"
import express from "express";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin)
router.get("/logout", userLogout)


export default router;