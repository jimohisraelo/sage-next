"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={35}
            height={35}
            className="rounded"
          />
          <span className="text-2xl font-bold text-gray-900">SAGE</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-900">
          <Link href="/" className="hover:underline hover:font-semibold">
            Home
          </Link>
          <Link href="/shop" className="hover:underline hover:font-semibold">
            Shop
          </Link>
          <Link href="/about" className="hover:underline hover:font-semibold">
            About
          </Link>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600"
          >
            WhatsApp Order
          </a>

          {/* Cart Icon (Emoji version) */}
          <Link
            href="/cart"
            className="text-2xl hover:scale-110 transition-transform duration-200"
            title="View Cart"
          >
            🛒
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-900 focus:outline-none text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-gray-900">
          <Link
            href="/"
            className="block hover:underline hover:font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="block hover:underline hover:font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="block hover:underline hover:font-semibold"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          {/* WhatsApp Button (Mobile) */}
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-green-600"
            onClick={() => setIsOpen(false)}
          >
            WhatsApp Order
          </a>

          {/* Cart Link (Mobile) */}
          <Link
            href="/cart"
            className="block text-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 text-lg"
            onClick={() => setIsOpen(false)}
          >
            🛒 Cart
          </Link>
        </div>
      )}
    </nav>
  );
}
