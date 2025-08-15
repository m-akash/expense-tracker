"use client";

import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ExpenseForm } from "@/components/forms/ExpenseForm";
import { apiService, type Expense } from "@/lib/api";
import { toast } from "sonner";

export default function AddExpensePage() {
  const router = useRouter();

  const handleSubmit = async (expense: Omit<Expense, "_id">) => {
    await apiService.createExpense(expense);
    toast.success("Expense added successfully!");
    router.push("/dashboard/expenses");
  };

  return (
    <DashboardLayout>
      <div className="lg:space-y-10 space-y-6 flex flex-col items-center justify-center md:py-20">
        <div>
          <h1 className="text-3xl text-center font-bold text-gray-900">
            Add Expense
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            Track your spending by adding a new expense.
          </p>
        </div>

        <div className="w-full max-w-5xl">
          <ExpenseForm onSubmit={handleSubmit} />
        </div>
      </div>
    </DashboardLayout>
  );
}
