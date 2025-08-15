"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/auth/login");
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex items-center space-x-2">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="text-lg font-medium text-gray-700">Loading...</span>
      </div>
    </div>
  );
}
