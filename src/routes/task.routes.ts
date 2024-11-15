import e, { Router } from "express";
import {
  generateTask,
  getTasks,
  removeTask,
} from "../controllers/task.controllers";

const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.post("/", generateTask);
taskRouter.delete("/:id", removeTask);

export default taskRouter;
