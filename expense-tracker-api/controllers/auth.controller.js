import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import { tokenBlacklist } from "../utills/tokenBlacklist.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      const error = new Error("User already exits!");
      error.statusCode = 409;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );
    newUsers.save;
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      const error = new Error("Invalid credentials!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ userId: isUserExist._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: isUserExist,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    tokenBlacklist.add(token);

    res.status(200).json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};
