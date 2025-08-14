'use client';

import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ExpenseForm } from '@/components/forms/ExpenseForm';
import { apiService, type Expense } from '@/lib/api';
import { toast } from 'sonner';

export default function AddExpensePage() {
  const router = useRouter();

  const handleSubmit = async (expense: Omit<Expense, '_id'>) => {
    await apiService.createExpense(expense);
    toast.success('Expense added successfully!');
    router.push('/dashboard/expenses');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Expense</h1>
          <p className="text-gray-600 mt-2">Track your spending by adding a new expense.</p>
        </div>

        <div className="max-w-2xl">
          <ExpenseForm onSubmit={handleSubmit} />
        </div>
      </div>
    </DashboardLayout>
  );
}