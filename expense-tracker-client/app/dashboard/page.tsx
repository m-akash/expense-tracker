"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiService, type Expense } from "@/lib/api";
import { DollarSign, TrendingUp, Receipt, Calendar } from "lucide-react";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await apiService.getExpenses();
      //Type the response properly to handle both array and object with expenses property
      const expensesArray: Expense[] = Array.isArray(data)
        ? data
        : (data as { expenses?: Expense[] }).expenses || [];
      setExpenses(expensesArray);
    } catch (error) {
      console.error("Failed to load expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const currentDate = new Date();
    return (
      expenseDate.getMonth() === currentDate.getMonth() &&
      expenseDate.getFullYear() === currentDate.getFullYear()
    );
  });
  const thisMonthTotal = thisMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const stats = [
    {
      title: "Total Expenses",
      value: `$${totalAmount.toFixed(2)}`,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "This Month",
      value: `$${thisMonthTotal.toFixed(2)}`,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Transactions",
      value: expenses.length.toString(),
      icon: Receipt,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Average/Month",
      value: `$${(totalAmount / 12).toFixed(2)}`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here&apos;s your expense overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Expenses */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : recentExpenses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No expenses found. Add your first expense to get started!
              </div>
            ) : (
              <div className="space-y-4">
                {recentExpenses.map((expense) => (
                  <div
                    key={expense._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {expense.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {expense.category} •{" "}
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      ${expense.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
