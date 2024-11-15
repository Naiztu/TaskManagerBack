import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";
import { createUser, getUserByEmail } from "../model/user.model";
import * as jwt from "jsonwebtoken";

/**
 * The function registers a user by hashing the password and creating a new user with the provided
 * email and encrypted password.
 * @param {Request} req - The `req` parameter in the `registesUser` function is typically an object
 * representing the HTTP request. It contains information about the request made to the server, such as
 * the request headers, body, parameters, and more. In this specific function, `req` is expected to be
 * an object
 * @param {Response} res - The `res` parameter in the `registesUser` function is an object representing
 * the HTTP response that the function will send back to the client. It allows you to set the status
 * code, headers, and send data back to the client in response to their request.
 * @returns If an error occurs during the creation of the user (in the `try` block), a response with
 * status code 500 and a JSON object containing the message "Internal server error" will be returned.
 * Otherwise, if the user is successfully created, a response with status code 201 and a JSON object
 * containing the message "User created" will be returned.
 */
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  const encryptedPassword = await hashPassword(password);

  try {
    await createUser(email, encryptedPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" , error});
  }

  res.status(201).json({ message: "User created" });
};

/**
 * The function `loginUser` handles user authentication by checking the email and password, generating
 * a JWT token, and returning it along with the user information.
 * @param {Request} req - Request object containing user input data such as email and password.
 * @param {Response} res - The `res` parameter in the `loginUser` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this function, it is used to send JSON responses with status codes such as 401 for unauthorized
 * access and 200
 * @returns If the user is not found or the password is invalid, a response with status code 401 and a
 * message "Unauthorized" is being returned. If the user is successfully authenticated, a token and the
 * user object are being returned in a response with status code 200.
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  const user = await getUserByEmail(email);

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword)
    return res.status(401).json({ message: "Unauthorized" });

  const token = jwt.sign({ ...user }, process.env.JWT_SECRET);

  res.status(200).json({ token, user });
};
