# Full-Stack Expense Tracker

This is a comprehensive full-stack expense tracker application designed to help users manage their finances effectively. The application provides a user-friendly interface for tracking expenses, viewing spending patterns, and generating reports. The frontend is built with Next.js and Tailwind CSS, offering a modern and responsive user experience. The backend is a robust RESTful API built with Node.js, Express, and MongoDB, ensuring secure and efficient data management.

## Features

### Frontend (Client)

- **User Authentication:** Secure sign-up and sign-in functionality with JWT.
- **Dashboard:** An intuitive dashboard that provides a quick overview of total expenses, monthly spending, and recent transactions.
- **Expense Management:** Full CRUD (Create, Read, Update, Delete) functionality for expenses.
- **Filtering and Pagination:** Easily filter expenses by category, date range, and search term. Paginated results for efficient browsing of large datasets.
- **Data Visualization:** Interactive charts and graphs to visualize spending patterns by category and over time.
- **Responsive Design:** A fully responsive layout that works seamlessly on desktops, tablets, and mobile devices.
- **Toast Notifications:** User-friendly notifications for actions like adding, updating, or deleting expenses.

### Backend (API)

- **RESTful API:** A well-structured RESTful API for managing users and expenses.
- **Authentication and Authorization:** Secure authentication using JSON Web Tokens (JWT) and middleware to protect routes.
- **MongoDB Integration:** Utilizes Mongoose for elegant MongoDB object modeling and data validation.
- **Error Handling:** Centralized error handling middleware for consistent error responses.
- **Validation:** Input validation using `express-validator` to ensure data integrity.
- **Environment Configuration:** Separate configuration for development and production environments using `.env` files.

## Tech Stack

**Frontend:**

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Recharts](https://recharts.org/)

**Backend:**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)

## Live Demo

- **Live Application**: [Expense-Tracker](https://daily-expenditure.vercel.app/)
- **Frontend Repository**: [GitHub Frontend](https://github.com/m-akash/expense-tracker/tree/main/expense-tracker-client)
- **Backend Repository**: [GitHub Backend](https://github.com/m-akash/expense-tracker/tree/main/expense-tracker-api)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or a cloud-based service like MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd expense-tracker
   ```

### Backend Setup

1. **Navigate to the `expense-tracker-api` directory:**
   ```bash
   cd expense-tracker-api
   ```
2. **Install the dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env.development.local` file** in the root of the `expense-tracker-api` directory and add the following environment variables:
   ```
   PORT=5000
   NODE_ENV=development
   DB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   JWT_EXPIRES_IN=1d
   ```
4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The API will be running at `http://localhost:5500`.

### Frontend Setup

1. **Navigate to the `expense-tracker-client` directory:**
   ```bash
   cd ../expense-tracker-client
   ```
2. **Install the dependencies:**
   ```bash
   npm install
   ```
3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser** and navigate to `http://localhost:3000`.

## Project Structure

```
expense-tracker/
├── expense-tracker-api/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utills/
└── expense-tracker-client/
    ├── app/
    │   ├── auth/
    │   │   ├── login/
    │   │   └── register/
    │   └── dashboard/
    │       ├── add-expense/
    │       ├── analytics/
    │       ├── expenses/
    │       └── reports/
    ├── components/
    │   ├── forms/
    │   ├── layout/
    │   ├── tables/
    │   └── ui/
    ├── hooks/
    ├── lib/
    └── public/
```

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

## Environment Variables

### Backend (`.env.development.local`)

- `PORT`: The port the backend server will run on (e.g., 5000).
- `NODE_ENV`: The environment (e.g., `development`, `production`).
- `DB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for signing JWTs.
- `JWT_EXPIRES_IN`: The expiration time for JWTs (e.g., `1d`, `7d`).

## Author

**Mehedi Hasan Akash**  
- GitHub: [@m-akash](https://github.com/m-akash)  
- LinkedIn: [Mehedi Hasan Akash](https://www.linkedin.com/in/mehedi-hasan-akash/)




