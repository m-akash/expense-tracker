# Expense Tracker Client

This is the frontend for the Expense Tracker application, built with Next.js, Tailwind CSS, and Shadcn UI.

## Features

- User authentication (sign up, sign in, sign out)
- Dashboard with expense overview
- CRUD operations for expenses
- Expense filtering and pagination
- Expense analytics with charts
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/m-akash/expense-tracker
   ```
2. Navigate to the `expense-tracker-client` directory:
   ```bash
   cd expense-tracker/expense-tracker-client
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
expense-tracker-client/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── add-expense/
│   │   │   └── page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   ├── expenses/
│   │   │   └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── forms/
│   │   └── ExpenseForm.tsx
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── tables/
│   │   └── ExpenseTable.tsx
│   └── ui/
│       ├── ... (Shadcn UI components)
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── api.ts
│   ├── auth.tsx
│   └── utils.ts
├── public/
│   ├── ... (svg icons)
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```
