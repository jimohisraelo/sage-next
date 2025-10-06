import Link from "next/link";

export default function ProductsListPage() {
  // Stubbed product list
  const products = [
    { id: 1, name: "Blue T-shirt", price: "₦5000" },
    { id: 2, name: "Black Jeans", price: "₦15000" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-600">{p.price}</p>
            </div>
            <Link
              href={`/admin/edit-product/${p.id}`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
