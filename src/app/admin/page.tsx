import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <Link
          href="/admin/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
        >
          ➕ Add New Product
        </Link>

        <Link
          href="/admin/products"
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700"
        >
          📦 View All Products
        </Link>
      </div>
    </div>
  );
}
