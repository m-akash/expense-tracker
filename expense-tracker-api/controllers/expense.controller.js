import mongoose from "mongoose";
import Expense from "../models/expense.model.js";

// Create new expense
export const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;
    const expense = new Expense({
      userId: req.user._id,
      title,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
    });
    const savedExpense = await expense.save();
    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: savedExpense,
    });
  } catch (error) {
    next(error);
  }
};

// Get all expenses
export const getAllExpenses = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      sortBy = "date",
      order = "desc",
    } = req.query;

    const query = {};
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    const sortOrder = order === "asc" ? 1 : -1;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    const expenses = await Expense.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Expense.countDocuments(query);
    const totalAmount = await Expense.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      success: true,
      data: expenses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasMore: page * limit < total,
      },
      summary: {
        totalAmount: totalAmount[0]?.total || 0,
        count: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get single expense
export const getExpenseById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

// Update expense
export const updateExpense = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }
    const { title, amount, category, date } = req.body;
    const updateData = {
      title,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
    };
    const expense = await Expense.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

// Delete expense
export const deleteExpense = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};
