"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login({ email, password });
      setAuth(res.user, res.token);
      if (res.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/shop");
      }
    } catch (err) {
      console.error(err);
      setError("Giriş başarısız. Email veya şifre hatalı olabilir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Giriş Yap</h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">E-posta</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 outline-none focus:ring focus:ring-blue-300"
              placeholder="ornek@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1">Şifre</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 outline-none focus:ring focus:ring-blue-300"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="mt-5 text-center text-sm text-gray-600">
          Hesabın yok mu?{" "}
          <span
            onClick={() => router.push("/auth/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Kayıt Ol
          </span>
        </p>
      </div>
    </div>
  );
}
