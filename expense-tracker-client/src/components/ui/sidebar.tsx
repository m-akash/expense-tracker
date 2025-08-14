"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, PlusCircle, List, PieChart, Settings } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/add-expense", label: "Add Expense", icon: PlusCircle },
    { href: "/expenses", label: "All Expenses", icon: List },
    { href: "/reports", label: "Reports", icon: PieChart },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`bg-white h-screen p-4 fixed top-0 left-0 z-50 transform transition-transform duration-200 md:translate-x-0 md:static w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-2">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Icon size={20} className="mr-3" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout button */}
        {/* <div className="mt-10">
          <Button variant="destructive" className="w-full">
            Logout
          </Button>
        </div> */}
      </aside>
    </>
  );
}
