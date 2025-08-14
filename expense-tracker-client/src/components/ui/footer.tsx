"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Logo & Copyright */}
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-lg font-semibold text-gray-700">
              Expense Tracker
            </Link>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} MyApp. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-500 hover:text-gray-800">
              About
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-800">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-800">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
