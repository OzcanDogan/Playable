"use client";

import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <Footer />
    </div>
  );
}