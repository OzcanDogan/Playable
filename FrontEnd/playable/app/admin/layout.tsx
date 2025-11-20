import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        <nav className="flex flex-col gap-3">
          <Link href="/admin" className="hover:text-gray-300">
            Dashboard
          </Link>

          <Link href="/admin/products/list" className="hover:text-gray-300">
            Products
          </Link>

          <Link href="/admin/products/create" className="hover:text-gray-300">
            Create Product
          </Link>

          <Link href="/admin/categories" className="hover:text-gray-300">
            Categories
          </Link>

          <Link href="/admin/categories/create" className="hover:text-gray-300">
            Create Category
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
