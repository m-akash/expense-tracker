import { body, validationResult } from "express-validator";

export const validateExpense = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .trim(),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value) => {
      if (parseFloat(value) <= 0) {
        throw new Error("Amount must be greater than 0");
      }
      return true;
    }),

  body("category").notEmpty().withMessage("Category is required").trim(),

  body("date").notEmpty().withMessage("Date is required"),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errors.array(),
    });
  }
  next();
};
