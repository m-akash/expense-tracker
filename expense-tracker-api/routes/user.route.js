import express from "express";
import { getUserById, getUsers } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.post("/", (req, res) => res.send({ title: "Create new user" }));

userRouter.get("/:id", authorize, getUserById);

userRouter.put("/:id", (req, res) => res.send({ title: "Update user" }));

userRouter.delete("/id", (req, res) => res.send({ title: "Delete user" }));

export default userRouter;
