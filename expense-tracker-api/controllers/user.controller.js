import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const isUserExists = await User.findById(req.params.id).select("-password");
    if (!isUserExists) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "User details",
      data: isUserExists,
    });
  } catch (error) {
    next(error);
  }
};
