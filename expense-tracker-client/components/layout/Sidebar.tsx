"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Plus,
  Receipt,
  BarChart3,
  Settings,
  TrendingUp,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Add Expense", href: "/dashboard/add-expense", icon: Plus },
  { name: "Expenses", href: "/dashboard/expenses", icon: Receipt },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Reports", href: "/dashboard/reports", icon: TrendingUp },
];

const secondaryNavigation = [{ name: "Settings", href: "", icon: Settings }];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out overflow-hidden lg:relative lg:translate-x-0 lg:top-0 lg:h-full lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-6 overflow-hidden">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => window.innerWidth < 1024 && onClose()}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-10 px-3 text-left font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="px-4 pb-6 flex-shrink-0">
            <div className="border-t border-gray-200 pt-4">
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => window.innerWidth < 1024 && onClose()}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-10 px-3 text-left font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
