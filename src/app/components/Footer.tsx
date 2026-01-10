"use client";

import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

// TikTok Icon Component
const TikTokIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">SAGE</h3>
            <p className="text-sm text-gray-400">Faith-inspired fashion for the modern believer. Wear your faith boldly.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/shop" className="hover:text-white cursor-pointer transition text-gray-400 block">
                Shop All
              </Link>
              <Link href="/about" className="hover:text-white cursor-pointer transition text-gray-400 block">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-white cursor-pointer transition text-gray-400 block">
                Contact Us
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/sagewearsbrand/#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-gray-400">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@sagewearsbrand" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-gray-400">
                <TikTokIcon />
              </a>
              <a href="https://www.facebook.com/101567422567950" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-gray-400">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SAGE. All rights reserved. Faith meets Fashion.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;