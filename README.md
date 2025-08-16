# Full-Stack Expense Tracker(PWA)

This is a comprehensive full-stack expense tracker application(pwa) designed to help users manage their finances effectively. The application provides a user-friendly interface for tracking expenses, viewing spending patterns, and generating reports.

- **Frontend:** Built with Next.js, TypeScript, and Tailwind CSS, offering a modern, responsive, and installable Progressive Web App (PWA) experience.
- **Backend:** A robust RESTful API built with Node.js, Express, and MongoDB for secure and efficient data management.

## Features

### Frontend (Client)

- **Progressive Web App (PWA):** Installable on mobile and desktop devices for an app-like experience.
- **User Authentication:** Secure sign-up and sign-in functionality with JWT.
- **Dashboard:** An intuitive dashboard with a quick overview of total expenses, monthly spending, and recent transactions.
- **Expense Management:** Full CRUD (Create, Read, Update, Delete) functionality for expenses.
- **Data Filtering and Pagination:** Easily filter expenses by category, date range, and search term, with paginated results.
- **Data Visualization:** Interactive charts and graphs to visualize spending patterns.
- **Responsive Design:** A fully responsive layout that works seamlessly on all devices.
- **Toast Notifications:** User-friendly notifications for various actions.

### Backend (API)

- **RESTful API:** A well-structured API for managing users and expenses.
- **Authentication and Authorization:** Secure authentication using JSON Web Tokens (JWT) and middleware.
- **MongoDB Integration:** Utilizes Mongoose for data modeling and validation.
- **Error Handling:** Centralized error handling for consistent responses.
- **Input Validation:** Ensures data integrity using `express-validator`.
- **Environment Configuration:** Separate configurations for development and production.

## Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
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
- MongoDB (local or a cloud-based service)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/m-akash/expense-tracker.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd expense-tracker
    ```

### Backend Setup

1.  **Go to the API directory:**
    ```bash
    cd expense-tracker-api
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env.development.local` file** and add the following variables:
    ```
    PORT=5500
    NODE_ENV=development
    DB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    JWT_EXPIRES_IN=1d
    ```
4.  **Start the server:**
    ```bash
    npm run dev
    ```
    The API will be available at `http://localhost:5500`.

### Frontend Setup

1.  **Go to the client directory:**
    ```bash
    cd ../expense-tracker-client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
4.  **Open your browser** and go to `http://localhost:3000`.

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
    │   ├── (auth)/
    │   │   ├── login/
    │   │   └── register/
    │   └── (dashboard)/
    │       ├── add-expense/
    │       ├── analytics/
    │       └── ...
    ├── components/
    │   ├── forms/
    │   ├── layout/
    │   └── ui/
    ├── lib/
    └── public/
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/sign-up`
- `POST /api/v1/auth/sign-in`
- `POST /api/v1/auth/sign-out`

### Users

- `GET /api/v1/users`
- `GET /api/v1/users/:id`

### Expenses

- `POST /api/v1/expenses`
- `GET /api/v1/expenses`
- `GET /api/v1/expenses/:id`
- `PATCH /api/v1/expenses/:id`
- `DELETE /api/v1/expenses/:id`

## Author

**Mehedi Hasan Akash**
- GitHub: [@m-akash](https://github.com/m-akash)
- LinkedIn: [Mehedi Hasan Akash](https://www.linkedin.com/in/mehedi-hasan-akash/)