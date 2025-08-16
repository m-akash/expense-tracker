"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import type { Expense } from "@/lib/api";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  itemsPerPage: number;
}

export function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
  currentPage,
  itemsPerPage,
}: ExpenseTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExpenses = expenses.slice(startIndex, endIndex);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-blue-900 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-blue-400">Title</TableHead>
            <TableHead className="font-bold text-blue-400">Amount</TableHead>
            <TableHead className="font-bold text-blue-400">Category</TableHead>
            <TableHead className="font-bold text-blue-400">Date</TableHead>
            <TableHead className="font-bold text-right text-blue-400">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedExpenses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-12 text-blue-400"
              >
                No expenses found
              </TableCell>
            </TableRow>
          ) : (
            paginatedExpenses.map((expense) => (
              <TableRow
                key={expense._id}
                className="bg-gray-800 hover:bg-gray-700"
              >
                <TableCell className="font-semibold text-blue-400">
                  {expense.title}
                </TableCell>
                <TableCell className="font-semibold text-blue-400">
                  ৳{expense.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-gray-700 text-blue-400 border-gray-200"
                  >
                    {expense.category}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-blue-400">
                  {new Date(expense.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(expense)}
                      className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-400 hover:bg-red-200 hover:text-red-600"
                          disabled={deletingId === expense._id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Expense</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &quot;
                            {expense.title}&quot;? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              expense._id && handleDelete(expense._id)
                            }
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
