import {Task  } from "../database/entities/task.entity";
import AppDataSoruce from "../../ormconfig.cli";

export async function createTask(
  title: string,
  description: string
): Promise<Task> {
  const task = new Task();
  task.title = title;
  task.description = description;

  const taskRepository = AppDataSoruce.getRepository(Task);

  return taskRepository.save(task);
}

export async function getTaskByUserId(userId: number): Promise<Task[]> {
  const taskRepository = AppDataSoruce.getRepository(Task);

  return taskRepository.find({
    where: {
      userId,
    },
  });
}