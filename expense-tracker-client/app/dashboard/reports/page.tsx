"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiService, type Expense } from "@/lib/api";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { toast } from "sonner";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#F97316",
  "#84CC16",
  "#EC4899",
  "#6B7280",
];

export default function AnalyticsPage() {
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
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  // Calculate category data for pie chart
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Calculate monthly data for bar chart
  const monthlyData = expenses
    .reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const existing = acc.find((item) => item.month === monthKey);
      if (existing) {
        existing.amount += expense.amount;
      } else {
        acc.push({ month: monthKey, amount: expense.amount });
      }
      return acc;
    }, [] as { month: string; amount: number }[])
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12); // Last 12 months

  // Calculate statistics
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });
  const thisMonthAmount = thisMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const lastMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === lastMonth &&
      expenseDate.getFullYear() === lastMonthYear
    );
  });
  const lastMonthAmount = lastMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const monthlyChange =
    lastMonthAmount === 0
      ? 0
      : ((thisMonthAmount - lastMonthAmount) / lastMonthAmount) * 100;
  const averageExpense =
    expenses.length > 0 ? totalAmount / expenses.length : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">
              Loading your expense analytics...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">
            Insights into your spending patterns
          </p>
        </div>

        {expenses.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">
                No expense data available for reports.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart - Expenses by Category */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toFixed(2)}`,
                        "Amount",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart - Monthly Trends */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Monthly Spending Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const [year, month] = value.split("-");
                        return `${month}/${year.slice(2)}`;
                      }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toFixed(2)}`,
                        "Amount",
                      ]}
                      labelFormatter={(value) => {
                        const [year, month] = value.split("-");
                        const date = new Date(
                          parseInt(year),
                          parseInt(month) - 1
                        );
                        return date.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        });
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="amount"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Category Breakdown Table */}
        {categoryData.length > 0 && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData
                  .sort((a, b) => b.value - a.value)
                  .map((category, index) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ${category.value.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {((category.value / totalAmount) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
