import * as bcrypt from 'bcrypt';

/**
 * The function `hashPassword` asynchronously generates a hashed password using bcrypt with a specified
 * number of salt rounds.
 * @param {string} password - The `password` parameter is a string that represents the user's password
 * that needs to be hashed for security purposes.
 * @returns The `hashPassword` function returns a Promise that resolves to a hashed version of the
 * input `password` string.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * The function `comparePassword` asynchronously compares two passwords using bcrypt and returns a
 * boolean indicating if they match.
 * @param {string} password - The `password` parameter is a string that represents the password that
 * the user is trying to authenticate.
 * @param {string} toComparePassword - The `toComparePassword` parameter in the `comparePassword`
 * function is the password that you want to compare against. This function uses the `bcrypt.compare`
 * method to compare the provided `password` with the `toComparePassword` and returns a boolean value
 * indicating whether they match or not.
 * @returns The `comparePassword` function is returning a Promise that resolves to a boolean value. The
 * boolean value indicates whether the `password` matches the `toComparePassword` after being compared
 * using bcrypt's `compare` method.
 */
export const comparePassword = async (
  password: string,
  toComparePassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, toComparePassword);
};
