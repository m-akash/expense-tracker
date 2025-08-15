import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://daily-expenditure.vercel.app"]
        : ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
import authRouter from "./routes/auth.route.js";
import expenseRouter from "./routes/expense.route.js";
import userRouter from "./routes/user.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);

//Error handeling middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Wellcome to the expense tracker API!");
});

app.listen(PORT, async (req, res) => {
  console.log(`Expense tracker api running at port: http://localhost:${PORT}`);
  await connectToDatabase();
});
