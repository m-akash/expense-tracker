import express from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} from "../controllers/expense.controller.js";
import {
  handleValidationErrors,
  validateExpense,
} from "../middlewares/validation.middleware.js";
import { authorize } from "../middlewares/auth.middleware.js";

const expenseRouter = express.Router();
expenseRouter.post(
  "/",
  authorize,
  validateExpense,
  handleValidationErrors,
  createExpense
);
expenseRouter.get("/", authorize, getAllExpenses);
expenseRouter.get("/:id", authorize, getExpenseById);
expenseRouter.patch(
  "/:id",
  authorize,
  validateExpense,
  handleValidationErrors,
  updateExpense
);
expenseRouter.delete("/:id", authorize, deleteExpense);

export default expenseRouter;
