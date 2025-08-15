# Expense Tracker API

This is the backend API for the Expense Tracker application. It is built with Node.js, Express, and MongoDB.

## Features

- User authentication (sign up, sign in, sign out)
- CRUD operations for expenses
- Get user details
- Pagination and filtering for expenses
- Error handling
- Validation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```
2. Navigate to the `expense-tracker-api` directory:
   ```bash
   cd expense-tracker/expense-tracker-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.development.local` file in the root of the `expense-tracker-api` directory and add the following environment variables:
   ```
   PORT=5000
   NODE_ENV=development
   DB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   JWT_EXPIRES_IN=1d
   ```

### Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. The API will be running at `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /api/v1/auth/sign-up`: Create a new user.
- `POST /api/v1/auth/sign-in`: Log in a user.
- `POST /api/v1/auth/sign-out`: Log out a user.

### Users

- `GET /api/v1/users`: Get all users.
- `GET /api/v1/users/:id`: Get a user by ID.

### Expenses

- `POST /api/v1/expenses`: Create a new expense.
- `GET /api/v1/expenses`: Get all expenses for the authenticated user.
- `GET /api/v1/expenses/:id`: Get an expense by ID.
- `PATCH /api/v1/expenses/:id`: Update an expense.
- `DELETE /api/v1/expenses/:id`: Delete an expense.

## Project Structure

```
expense-tracker-api/
├── config/
│   └── env.js
├── controllers/
│   ├── auth.controller.js
│   ├── expense.controller.js
│   └── user.controller.js
├── database/
│   └── mongodb.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validation.middleware.js
├── models/
│   ├── expense.model.js
│   └── user.model.js
├── routes/
│   ├── auth.route.js
│   ├── expense.route.js
│   └── user.route.js
├── utills/
│   └── tokenBlacklist.js
├── .env.development.local
├── .env.production.local
├── .gitignore
├── app.js
├── package-lock.json
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.
