"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Star, TrendingUp, Truck } from 'lucide-react';
import Slideshow from '../components/Slideshow';
import { products } from '../context/CartContext';

function HomePage() {
  const featured = products.slice(0, 4);
  const latestDrops = products.filter(p => p.isLatestDrop);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight text-white">SAGE</h1>
          <p className="text-2xl md:text-3xl mb-4 text-gray-200 font-light">Where Faith Meets Fashion</p>
          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Express your faith through style. Contemporary Christian apparel designed for believers who want to make a statement.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-200 transition transform hover:scale-105"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Latest Drop Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider animate-pulse">
              🔥 Just Dropped
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-4 text-white">Latest Drop</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fresh faith-inspired styles just landed. Limited quantities. Walk in faith, dress in purpose.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {latestDrops.map((product) => (
            <Link
              key={product.id}
              href={`/product?id=${product.id}`}
              className="group cursor-pointer bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 block"
            >
              <div className="relative h-96 overflow-hidden">
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold z-10 animate-pulse">
                  NEW DROP
                </div>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="w-full h-full object-contain bg-gray-50 group-hover:opacity-0 transition-opacity duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Image
                  src={product.images[1] || product.images[0]}
                  alt={product.name}
                  fill
                  className="absolute inset-0 w-full h-full object-contain bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 text-center bg-white">
                <h3 className="font-bold text-2xl mb-2 text-black">{product.name}</h3>
                <p className="text-2xl font-bold text-red-600">₦{product.price.toLocaleString()}</p>
                <div className="mt-4 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                  Shop Now
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Slideshow Section */}
      <Slideshow />

      {/* Features Section */}
      <section className="py-16 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-black" />
            <h3 className="font-bold text-lg mb-2 text-black">Secure Payment</h3>
            <p className="text-gray-600 text-sm">100% secure transactions</p>
          </div>
          <div className="text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-black" />
            <h3 className="font-bold text-lg mb-2 text-black">Premium Quality</h3>
            <p className="text-gray-600 text-sm">Faith-inspired designs</p>
          </div>
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-black" />
            <h3 className="font-bold text-lg mb-2 text-black">Trending Styles</h3>
            <p className="text-gray-600 text-sm">Latest faith fashion</p>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 px-6 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-black">Featured Collection</h2>
          <p className="text-gray-600 text-lg">Handpicked faith-inspired styles</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
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
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 text-white">Our Mission</h2>
          <p className="text-xl text-gray-200 leading-relaxed mb-6">
            SAGE is more than a clothing brand. it's a movement. We believe fashion and faith can coexist beautifully. 
            Every piece is designed to help you express your beliefs boldly and stylishly.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            "Let your light shine before others, that they may see your good deeds." - Matthew 5:16
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Join the SAGE Community</h2>
          <p className="text-lg text-gray-700 mb-8">
            Be the first to know about new faith-inspired drops, exclusive deals, and devotional content.
          </p>
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none text-black"
            />
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;