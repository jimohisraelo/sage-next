"use client";

import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useCart();
  const pathname = usePathname();
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="relative w-12 h-12">
            <Image
              src="/images/logo.ico"
              alt="SAGE Logo"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-2xl font-bold text-white">SAGE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`hover:text-gray-300 font-medium transition ${
                pathname === item.path ? 'text-white font-bold' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="https://wa.me/2348137434165"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium"
          >
            WhatsApp Order
          </a>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/cart" className="relative text-white">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4 space-y-3 text-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block w-full text-left py-2 ${
                pathname === item.path ? 'text-white font-bold' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a 
            href="https://wa.me/2348137434165" 
            className="block bg-green-500 text-white px-4 py-2 rounded-lg text-center mt-4"
            onClick={() => setMobileOpen(false)}
          >
            WhatsApp Order
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;