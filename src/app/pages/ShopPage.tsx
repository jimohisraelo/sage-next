"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '../context/CartContext';

function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'hoodies', name: 'Hoodies' },
    { id: 'caps', name: 'Caps' },
    { id: 'bags', name: 'Bags' },
    { id: 'sweatpants', name: 'Sweatpants' },
  ];

  const filtered =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-24 px-6 min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-center mb-4 text-black">Shop Collection</h1>
      <p className="text-center text-gray-600 mb-12 text-lg">Faith-inspired apparel for every believer</p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 ${
              selectedCategory === cat.id
                ? 'bg-black text-white shadow-lg'
                : 'bg-white text-black shadow-md hover:shadow-lg'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/product?id=${product.id}`}
            className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 block"
          >
            <div className="relative h-80 overflow-hidden bg-gray-50">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <Image
                src={product.images[1] || product.images[0]}
                alt={product.name}
                fill
                className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-xl mb-2 text-black">{product.name}</h3>
              <p className="text-lg font-semibold text-gray-900">₦{product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;