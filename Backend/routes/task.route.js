import express from "express";
import { addTask, deleteTask, getTasks, getTasksById, paginationWithSearch, updateTask, updateTaskStatus } from "../controller/task.controller.js";
const router = express.Router();

router.post("/register", addTask)
router.get("/get", getTasks)
router.get("/getbyid/:id", getTasksById)
router.get("/pagination/search", paginationWithSearch)
router.put("/update/:id", updateTask)
router.delete("/delete/:id", deleteTask)
router.put('/task/:id/status', updateTaskStatus);

export default router;