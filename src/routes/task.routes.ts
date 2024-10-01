import { Router } from "express";
import { createTask, getTaskById, getTasksByUser, updateTask, deleteTask } from "../controllers/TaskController";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.post("/created_task", createTask);
router.get("/list_user/:userId", getTasksByUser);
router.get("/list_task/:id", getTaskById);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;