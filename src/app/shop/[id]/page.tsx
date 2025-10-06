"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import products from "../../data/products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductPage() {
  const params = useParams();
  const id = Number(params.id);
  const product = products.find((p) => p.id === id);

  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] ?? ""
  );

  const related = useMemo(
    () => products.filter((p) => p.id !== id).slice(0, 4),
    [id]
  );

  if (!product) {
    return (
      <main className="p-8">
        <p className="text-center text-lg">Product not found.</p>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size 🩳");
      return;
    }
    addToCart(product, selectedSize);
    toast.success(`${product.name} added to cart! 🛒`, {
      theme: "dark",
    });
  };

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <ToastContainer position="bottom-right" autoClose={2000} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT: Product image */}
        <div className="relative group w-full rounded-lg overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[520px] md:h-[640px] object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={product.imageHover ?? product.image}
            alt={`${product.name} - hover`}
            className="w-full h-[520px] md:h-[640px] object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        {/* RIGHT: Product details */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
          <p className="text-2xl text-green-600 font-semibold mb-4">
            ${product.price}
          </p>

          {/* ✅ Improved description visibility */}
          <p className="text-white text-lg mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Select size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 border rounded-lg transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-800 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Add to Cart button with hover color inversion */}
          <div className="mt-auto">
            <button
              onClick={handleAddToCart}
              className={`w-full md:w-auto px-6 py-3 rounded-lg transition font-semibold ${
                selectedSize
                  ? "bg-black text-white hover:bg-white hover:text-black border border-black"
                  : "bg-gray-300 text-gray-600 pointer-events-none"
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related products section */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-8 text-center">
          You may also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.id}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg overflow-hidden group transition-transform hover:scale-[1.02]"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-56 object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={p.imageHover ?? p.image}
                  alt={`${p.name} hover`}
                  className="w-full h-56 object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-black">{p.name}</h3>
                <p className="text-black">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
