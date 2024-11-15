import { User } from "../database/entities/user.entity";
import AppDataSoruce from "../../ormconfig.cli";

/**
 * The function `createUser` creates a new user with the provided email and password and saves it to
 * the database.
 * @param {string} email - Email address of the user to be created.
 * @param {string} password - The `password` parameter in the `createUser` function is a string that
 * represents the password for the user being created.
 * @returns The `createUser` function is returning a Promise that resolves to a `User` object after
 * saving the user data to the database using the `userRepository.save(user)` method.
 */
export async function createUser(
  email: string,
  password: string
): Promise<User> {
  const user = new User();
  user.email = email;
  user.password = password;

  const userRepository = AppDataSoruce.getRepository(User);

  return await userRepository.save(user);
}

/**
 * This TypeScript function retrieves a user from a repository based on their email address
 * asynchronously.
 * @param {string} email - The `email` parameter is a string that represents the email address of the
 * user you want to retrieve from the database.
 * @returns The `getUserByEmail` function is returning a Promise that resolves to a `User` object based
 * on the provided email address. The function queries the user repository to find a user with the
 * specified email address.
 */
export async function getUserByEmail(email: string): Promise<User> {
  const userRepository = AppDataSoruce.getRepository(User);

  return userRepository.findOne({
    where: {
      email,
    },
  });
}
