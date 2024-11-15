import { Task } from "../database/entities/task.entity";
import AppDataSoruce from "../../ormconfig.cli";

/**
 * The function `createTask` creates a new task with the provided title, description, and user ID and
 * saves it to the database.
 * @param {string} title - The `title` parameter is a string that represents the title of the task
 * being created.
 * @param {string} description - The `description` parameter in the `createTask` function is a string
 * that represents the description of the task being created. It provides additional details or
 * information about the task that can help users understand what needs to be done.
 * @param {number} userId - The `userId` parameter in the `createTask` function represents the unique
 * identifier of the user to whom the task belongs. It is used to associate the task with a specific
 * user in the system.
 * @returns The `createTask` function is returning a Promise that resolves to a `Task` object after
 * saving the task data to the database using the task repository.
 */
export async function createTask(
  title: string,
  description: string,
  userId: number
): Promise<Task> {
  const task = new Task();
  task.title = title;
  task.description = description;
  task.userId = userId;

  const taskRepository = AppDataSoruce.getRepository(Task);

  return taskRepository.save(task);
}

/**
 * This function retrieves tasks associated with a specific user ID from a data source
 * asynchronously.
 * @param {number} userId - The `userId` parameter is a number that represents the unique identifier of
 * a user. This function `getTaskByUserId` is an asynchronous function that retrieves tasks associated
 * with a specific user based on their `userId`. It uses the `AppDataSource` to get the repository for
 * the `Task` entity
 * @returns The `getTaskByUserId` function is returning a Promise that resolves to an array of `Task`
 * objects. The function queries the task repository to find tasks that belong to a specific user ID.
 */
export async function getTaskByUserId(userId: number): Promise<Task[]> {
  const taskRepository = AppDataSoruce.getRepository(Task);

  return taskRepository.find({
    where: {
      userId,
    },
  });
}

/**
 * This TypeScript function deletes a task by its ID and the user's ID asynchronously.
 * @param {number} userId - The `userId` parameter represents the unique identifier of the user whose
 * task needs to be deleted.
 * @param {number} taskId - The `taskId` parameter represents the unique identifier of the task that
 * you want to delete.
 * @returns The `deleteTaskByIdAndUserId` function is returning a promise that resolves to the result
 * of deleting a task with the specified `userId` and `taskId` from the task repository.
 */
export async function deleteTaskByIdAndUserId(userId: number, taskId: number) {
  const taskRepository = AppDataSoruce.getRepository(Task);
  return taskRepository.delete({ userId, id: taskId });
}
