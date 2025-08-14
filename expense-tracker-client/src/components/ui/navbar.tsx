"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold">
              Expense Tracker
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Button size="sm">Login</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {isOpen ? <Menu size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
          <div className="px-4 py-3 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="space-y-1 px-4 py-3 overflow-y-auto h-full">
            <Link href="/" className="block hover:text-blue-600">
              Home
            </Link>
            <Link href="/dashboard" className="block hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/add-expense" className="block hover:text-blue-600">
              Add Expense
            </Link>
            <Link href="/expenses" className="block hover:text-blue-600">
              All Expenses
            </Link>
            <Link href="/reports" className="block hover:text-blue-600">
              Reports
            </Link>
            <Link href="/settings" className="block hover:text-blue-600">
              Settings
            </Link>
            <Button size="sm" className="mt-2 w-full">
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
