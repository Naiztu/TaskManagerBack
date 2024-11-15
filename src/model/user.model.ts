import { User } from "../database/entities/user.entity";
import AppDataSoruce from "../../ormconfig.cli";

export async function createUser(
  email: string,
  password: string
): Promise<User> {
  const user = new User();
  user.email = email;
  user.password = password;

  const userRepository = AppDataSoruce.getMongoRepository(User);

  return userRepository.save(user);
}

export async function getUserByEmail(email: string): Promise<User> {
  const userRepository = AppDataSoruce.getMongoRepository(User);

  return userRepository.findOne({
    where: {
      email,
    },
  });
}
