// app/shop/page.tsx
"use client";

import Link from "next/link";
import products from "../data/products"; // <-- make sure this path is correct

export default function ShopPage() {
  return (
    <main className="p-10 max-w-[120rem] mx-auto">
  <h1 className="text-4xl font-bold mb-8 text-center">Shop</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
    {products.map((p) => (
      <Link
        key={p.id}
        href={`/shop/${p.id}`}
        className="block bg-white rounded-xl shadow-lg overflow-hidden group transition-transform hover:scale-105"
      >
        {/* Product Image */}
        <div className="relative">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-96 object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={p.imageHover ?? p.image}
            alt={`${p.name} alt`}
            className="w-full h-96 object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 text-center">
          <h3 className="font-semibold text-xl text-black">{p.name}</h3>
          <p className="text-black text-lg font-medium">${p.price}</p>
        </div>
      </Link>
    ))}
  </div>
</main>

  );
}
