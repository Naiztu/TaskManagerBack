import { Response } from "express";
import {
  createTask,
  deleteTaskByIdAndUserId,
  getTaskByUserId,
} from "../model/task.model";
import { RequestWithUser } from "../types/requestWithUser";

/**
 * The function `getTasks` retrieves tasks associated with a user and sends them as a JSON response,
 * handling errors with an internal server error message.
 * @param {RequestWithUser} req - RequestWithUser
 * @param {Response} res - The `res` parameter in the `getTasks` function is the response object that
 * will be used to send the response back to the client making the request. It is typically used to set
 * the status code and send data back in the response.
 */
export async function getTasks(req: RequestWithUser, res: Response) {
  const user = req.user;
  try {
    const tasks = await getTaskByUserId(user.id);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * The function `generateTask` creates a new task with the provided title and description for the
 * authenticated user.
 * @param {RequestWithUser} req - RequestWithUser - Represents a request object that includes user
 * information.
 * @param {Response} res - Response object from Express, used to send HTTP responses to the client.
 */
export async function generateTask(req, res) {
  const user = req.user;
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  try {
    await createTask(title, description, user.id);
    res.status(201).json({ message: "Task created" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function removeTask(req, res) {
  const user = req.user;
  const taskId = parseInt(req.params.id);
  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  try {
    await deleteTaskByIdAndUserId(user.id, taskId);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
