"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ShoppingCart, Menu, X, Instagram, Facebook, Truck, Shield, Star, TrendingUp, ArrowLeft, Heart, Share2, Package, Check, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

// TikTok Icon Component
const TikTokIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// ============================================
// PRODUCTS DATA
// ============================================

const products = [
  {
    id: 1,
    name: "Basic Black Tee",
    price: 15000,
    category: "shirts",
    images: [
      "/images/shirt1.jpg",
      "/images/shirt2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium cotton T-shirt with faith-inspired design. Soft, breathable, and perfect for everyday wear while expressing your faith.",
    isLatestDrop: true,
    features: ["100% Premium Cotton", "Machine Washable", "Unisex Fit", "Faith-inspired Design"]
  },
  {
    id: 2,
    name: "Basic White Tee",
    price: 15000,
    category: "shirts",
    images: [
      "/images/white1.jpg",
      "/images/white2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium cotton T-shirt with faith-inspired design. Soft, breathable, and perfect for everyday wear while expressing your faith.",
    isLatestDrop: true,
    features: ["100% Premium Cotton", "Machine Washable", "Unisex Fit", "Faith-inspired Design"]
  },
  {
    id: 3,
    name: "Hoodie",
    price: 17999,
    category: "hoodies",
    images: [
      "/images/hoodie1.jpg",
      "/images/hoodie2.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Ultra-comfortable oversized hoodie with premium fleece lining. Wear your faith boldly.",
    features: ["Premium Fleece Lining", "Oversized Fit", "Kangaroo Pocket", "Drawstring Hood"]
  },
  {
    id: 4,
    name: "Baseball Cap",
    price: 6000,
    category: "caps",
    images: [
      "/images/blackcap1.jpg",
      "/images/blackcap2.jpg"
    ],
    sizes: ["One Size"],
    description: "Adjustable baseball cap with embroidered logo.",
    features: ["Adjustable Snapback", "Embroidered Logo", "Breathable Fabric", "One Size Fits Most"]
  },
  {
    id: 5,
    name: "Tote Bag",
    price: 5000,
    category: "bags",
    images: [
      "/images/tote1.jpg",
    ],
    sizes: ["One Size"],
    description: "Durable canvas tote with reinforced handles.",
    features: ["Durable Canvas", "Reinforced Handles", "Large Capacity", "Faith-based Print"]
  },
  {
    id: 6,
    name: "Tucker Cap",
    price: 6000,
    category: "caps",
    images: [
      "/images/cap1.jpg",
      "/images/cap2.jpg"
    ],
    sizes: ["S", "M", "L"],
    description: "Classic two-tone cap with adjustable strap and Classic design.",
    features: ["Two-Tone Design", "Adjustable Strap", "Structured Crown", "Available in Multiple Sizes"]
  },
  {
    id: 7,
    name: "Skull Cap",
    price: 4000,
    category: "caps",
    images: [
      "/images/skull.jpg",
    ],
    sizes: ["One Size"],
    description: "Soft knit beanie to keep you warm while expressing your faith in style.",
    features: ["Soft Acrylic Blend", "Stretchy Fit", "Warm & Cozy", "Faith-inspired Logo"]
  },
  {
    id: 8,
    name: "Redeemed Sweatpants",
    price: 16500,
    category: "sweatpants",
    images: [
      "/images/sp1.jpg",
      "/images/sp2.jpg",
      "/images/sp3.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    isLatestDrop: true,
    description: "Classic polo with modern stripes and faith-based messaging. Smart casual perfection.",
    features: ["Premium Cotton Blend", "Classic Polo Design", "Modern Stripes", "Faith-based Messaging"]
  }
];

// Slideshow images for random wear
const slideshowImages = [
  "/images/shirt1.jpg",
  "/images/white1.jpg",
  "/images/hoodie1.jpg",
  "/images/blackcap1.jpg",
  "/images/sp1.jpg",
];

// ============================================
// CART CONTEXT
// ============================================

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  description: string;
  isLatestDrop?: boolean;
  features?: string[];
};

type CartItem = Product & { quantity: number; size: string };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeOne: (id: number, size: string) => void;
  removeAll: (id: number, size: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('sage-cart');
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sage-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
  };

  const removeOne = (id: number, size: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeAll = (id: number, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeOne, removeAll, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

// ============================================
// NAVIGATION HISTORY
// ============================================
const navigationHistory: string[] = [];

// ============================================
// NAVBAR COMPONENT
// ============================================

function Navbar({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePageChange = (page: string) => {
    navigationHistory.push(page);
    setCurrentPage(page);
    localStorage.setItem('sage-current-page', page);
  };

  return (
    <nav className="fixed top-0 w-full bg-black shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div onClick={() => handlePageChange('home')} className="flex items-center gap-3 cursor-pointer">
          <div className="relative w-12 h-12">
            <Image
              src="/images/logo.ico"
              alt="SAGE Logo"
              fill
              className="rounded-full object-cover"
              sizes="48px"
            />
          </div>
          <span className="text-2xl font-bold text-white">SAGE</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-white">
          <button onClick={() => handlePageChange('home')} className="hover:text-gray-300 font-medium transition">
            Home
          </button>
          <button onClick={() => handlePageChange('shop')} className="hover:text-gray-300 font-medium transition">
            Shop
          </button>
          <button onClick={() => handlePageChange('about')} className="hover:text-gray-300 font-medium transition">
            About
          </button>
          <button onClick={() => handlePageChange('contact')} className="hover:text-gray-300 font-medium transition">
            Contact
          </button>
          <a
            href="https://wa.me/2348137434165"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium"
          >
            WhatsApp Order
          </a>
          <button onClick={() => handlePageChange('cart')} className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4 space-y-3 text-white">
          <button onClick={() => { handlePageChange('home'); setMobileOpen(false); }} className="block w-full text-left">
            Home
          </button>
          <button onClick={() => { handlePageChange('shop'); setMobileOpen(false); }} className="block w-full text-left">
            Shop
          </button>
          <button onClick={() => { handlePageChange('about'); setMobileOpen(false); }} className="block w-full text-left">
            About
          </button>
          <button onClick={() => { handlePageChange('contact'); setMobileOpen(false); }} className="block w-full text-left">
            Contact
          </button>
          <a href="https://wa.me/2348137434165" className="block bg-green-500 text-white px-4 py-2 rounded-lg text-center">
            WhatsApp
          </a>
          <button onClick={() => { handlePageChange('cart'); setMobileOpen(false); }} className="block w-full text-left">
            Cart ({cartCount})
          </button>
        </div>
      )}
    </nav>
  );
}

// ============================================
// FOOTER COMPONENT
// ============================================

function Footer({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const handlePageChange = (page: string) => {
    navigationHistory.push(page);
    setCurrentPage(page);
    localStorage.setItem('sage-current-page', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              <p onClick={() => handlePageChange('shop')} className="hover:text-white cursor-pointer transition text-gray-400">Shop All</p>
              <p onClick={() => handlePageChange('about')} className="hover:text-white cursor-pointer transition text-gray-400">About Us</p>
              <p onClick={() => handlePageChange('contact')} className="hover:text-white cursor-pointer transition text-gray-400">Contact Us</p>
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

// ============================================
// SLIDESHOW COMPONENT
// ============================================
function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-black">See SAGE in Action</h2>
          <p className="text-gray-600 text-lg">Real people, real faith, real style</p>
        </div>
        
        <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          {slideshowImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={img}
                alt={`SAGE Style ${index + 1}`}
                fill
                className="object-contain bg-gray-100"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          ))}
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// HOME PAGE
// ============================================

function HomePage({ setCurrentPage, setSelectedProduct }: { setCurrentPage: (page: string) => void; setSelectedProduct: (product: Product) => void }) {
  const featured = products.slice(0, 4);
  const latestDrops = products.filter(p => p.isLatestDrop);

  const handlePageChange = (page: string) => {
    navigationHistory.push(page);
    setCurrentPage(page);
    localStorage.setItem('sage-current-page', page);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    handlePageChange('product');
    localStorage.setItem('sage-selected-product', JSON.stringify(product));
  };

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
          <button
            onClick={() => handlePageChange('shop')}
            className="bg-white text-black px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-200 transition transform hover:scale-105"
          >
            Shop Collection
          </button>
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
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="group cursor-pointer bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
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
                <button className="mt-4 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                  Shop Now
                </button>
              </div>
            </div>
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
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
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
            </div>
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

// ============================================
// SHOP PAGE
// ============================================

function ShopPage({ setCurrentPage, setSelectedProduct }: { setCurrentPage: (page: string) => void; setSelectedProduct: (product: Product) => void }) {
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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigationHistory.push('product');
    setCurrentPage('product');
    localStorage.setItem('sage-current-page', 'product');
    localStorage.setItem('sage-selected-product', JSON.stringify(product));
  };

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
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
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
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// PRODUCT PAGE - UPDATED WITH RECOMMENDATIONS
// ============================================

function ProductPage({ product, setCurrentPage, setSelectedProduct }: { 
  product: Product; 
  setCurrentPage: (page: string) => void;
  setSelectedProduct: (product: Product) => void;
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Get recommended products (same category, excluding current product)
  const recommendedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // If not enough same-category products, add random products
  if (recommendedProducts.length < 4) {
    const additionalProducts = products
      .filter(p => p.id !== product.id && !recommendedProducts.includes(p))
      .slice(0, 4 - recommendedProducts.length);
    recommendedProducts.push(...additionalProducts);
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    alert(`Added ${product.name} (${selectedSize}) to cart!`);
  };

  const handlePageChange = (page: string) => {
    navigationHistory.push(page);
    setCurrentPage(page);
    localStorage.setItem('sage-current-page', page);
  };

  const handleProductClick = (clickedProduct: Product) => {
    setSelectedProduct(clickedProduct);
    localStorage.setItem('sage-selected-product', JSON.stringify(clickedProduct));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackButton = () => {
    if (navigationHistory.length > 1) {
      navigationHistory.pop(); // Remove current page
      const previousPage = navigationHistory[navigationHistory.length - 1] || 'shop';
      setCurrentPage(previousPage);
      localStorage.setItem('sage-current-page', previousPage);
    } else {
      handlePageChange('shop');
    }
  };

  return (
    <div className="py-24 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBackButton}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="relative h-[600px] mb-4 rounded-2xl overflow-hidden shadow-xl bg-gray-50">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="w-full h-full object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.isLatestDrop && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10 animate-pulse">
                  NEW DROP
                </div>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-24 h-24 cursor-pointer border-4 transition rounded-lg flex-shrink-0 bg-gray-50 ${
                    currentImageIndex === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${index + 1}`}
                    fill
                    className="object-contain rounded-lg"
                    sizes="96px"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-5xl font-bold mb-4 text-black">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-4xl font-bold text-black">₦{product.price.toLocaleString()}</p>
                {product.isLatestDrop && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    New Arrival
                  </span>
                )}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-10">
                <h3 className="font-bold text-xl mb-4 text-black">Product Features</h3>
                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="font-bold text-xl text-black">Select Size:</label>
                <button className="text-sm text-gray-600 hover:text-black transition">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-8 py-4 border-2 rounded-lg font-bold transition transform hover:scale-105 ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-black text-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-10">
              <label className="font-bold text-xl mb-4 block text-black">Quantity:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition font-bold text-xl text-black"
                  >
                    -
                  </button>
                  <span className="font-bold text-2xl w-12 text-center text-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition font-bold text-xl text-black"
                  >
                    +
                  </button>
                </div>
                <div className="text-gray-600">
                  Only {Math.floor(Math.random() * 20) + 5} items left!
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-5 rounded-lg text-xl font-bold hover:bg-gray-800 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart - ₦{(product.price * quantity).toLocaleString()}
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/2348137434165?text=${encodeURIComponent(`I want to order: ${product.name} (Size: ${selectedSize}, Quantity: ${quantity})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition text-center"
                >
                  Buy on WhatsApp
                </a>
                <button
                  onClick={() => handlePageChange('shop')}
                  className="border-2 border-black text-black py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-black">Secure Payment</p>
                  <p className="text-sm text-gray-600">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-black">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-black">Premium Quality</p>
                  <p className="text-sm text-gray-600">Faith-inspired design</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-black">Fast Delivery</p>
                  <p className="text-sm text-gray-600">Quick processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4 text-black">You Might Also Like</h2>
            <p className="text-gray-600 text-lg">Complete your faith-inspired look with these matching pieces</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedProducts.map((recommendedProduct) => (
              <div
                key={recommendedProduct.id}
                onClick={() => handleProductClick(recommendedProduct)}
                className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden bg-gray-50">
                  <Image
                    src={recommendedProduct.images[0]}
                    alt={recommendedProduct.name}
                    fill
                    className="w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <Image
                    src={recommendedProduct.images[1] || recommendedProduct.images[0]}
                    alt={recommendedProduct.name}
                    fill
                    className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  {recommendedProduct.isLatestDrop && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      NEW
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-2 text-black truncate">{recommendedProduct.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <p className="text-lg font-semibold text-gray-900">₦{recommendedProduct.price.toLocaleString()}</p>
                    {recommendedProduct.category === product.category && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {recommendedProduct.category}
                      </span>
                    )}
                  </div>
                  <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CART PAGE
// ============================================

function CartPage({ setCurrentPage, setSelectedProduct }: { 
  setCurrentPage: (page: string) => void; 
  setSelectedProduct: (product: Product) => void 
}) {
  const { cart, addToCart, removeOne, removeAll, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;
  
  // Get recommended products (exclude items already in cart)
  const cartProductIds = cart.map(item => item.id);
  const recommendedProducts = products
    .filter(product => !cartProductIds.includes(product.id))
    .slice(0, 4);

  const generateWhatsApp = () => {
    if (cart.length === 0) return '#';
    let msg = 'New Order from SAGE\n\n';
    cart.forEach((item) => {
      msg += `${item.quantity}x ${item.name}\n  Size: ${item.size}\n  Price: ₦${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    msg += `Total: ₦${total.toLocaleString()}`;
    return `https://wa.me/2348137434165?text=${encodeURIComponent(msg)}`;
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigationHistory.push('product');
    setCurrentPage('product');
    localStorage.setItem('sage-current-page', 'product');
    localStorage.setItem('sage-selected-product', JSON.stringify(product));
  };

  const handleBackToShop = () => {
    navigationHistory.push('shop');
    setCurrentPage('shop');
    localStorage.setItem('sage-current-page', 'shop');
  };

  const handleBackButton = () => {
    if (navigationHistory.length > 1) {
      navigationHistory.pop();
      const previousPage = navigationHistory[navigationHistory.length - 1] || 'shop';
      setCurrentPage(previousPage);
      localStorage.setItem('sage-current-page', previousPage);
    } else {
      handleBackToShop();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 px-6 text-center min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="max-w-lg">
          <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h1 className="text-4xl font-bold mb-4 text-black">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-lg">Looks like you haven&apos;t added anything yet!</p>
          <button
            onClick={handleBackButton}
            className="bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-center mb-4 text-black">Shopping Cart</h1>
      <p className="text-center text-gray-600 mb-12 text-lg">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Cart Items</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 font-semibold transition"
                >
                  Clear All
                </button>
              </div>
              
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${idx}`} className="flex items-center gap-6 pb-8 mb-8 border-b last:border-b-0 last:pb-0 last:mb-0">
                  <div className="relative w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-contain rounded-lg shadow-md"
                      sizes="128px"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-2xl mb-1 text-black">{item.name}</h3>
                    <p className="text-gray-500 mb-2">Size: <span className="font-semibold">{item.size}</span></p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₦{item.price.toLocaleString()} x {item.quantity} = ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => removeOne(item.id, item.size)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition font-bold text-xl text-black"
                    >
                      -
                    </button>
                    <span className="font-bold text-lg w-8 text-center text-black">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item, item.size)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition font-bold text-xl text-black"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeAll(item.id, item.size)}
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-black">You Might Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {recommendedProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="group cursor-pointer"
                    >
                      <div className="relative h-48 mb-3 rounded-xl overflow-hidden bg-gray-50">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <h3 className="font-semibold text-black truncate">{product.name}</h3>
                      <p className="font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-black">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="border-t pt-4 flex justify-between text-2xl font-bold">
                  <span className="text-black">Total:</span>
                  <span className="text-black">₦{total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <a
                  href={generateWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 text-white py-4 rounded-lg text-center text-lg font-bold hover:bg-green-700 transition transform hover:scale-105"
                >
                  Order via WhatsApp
                </a>
                <button
                  onClick={handleBackButton}
                  className="w-full border-2 border-black text-black py-4 rounded-lg text-lg font-semibold hover:bg-black hover:text-white transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Continue Shopping
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-black">Secure Checkout</p>
                    <p className="text-sm text-gray-600">Your payment information is encrypted</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-black">Fast Delivery</p>
                    <p className="text-sm text-gray-600">Quick processing time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ABOUT PAGE
// ============================================

function AboutPage() {
  return (
    <div className="py-24 px-6 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-black">About SAGE</h1>
        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          <p>
            Founded in 2025, SAGE is more than a clothing brand it&apos;s a faith movement. We believe that fashion and faith 
            are not mutually exclusive. Our mission is to create contemporary Christian apparel that empowers believers 
            to express their faith boldly and stylishly in everyday life.
          </p>
          <p>
            Every piece in our collection is thoughtfully designed with faith-inspired messaging and premium materials. 
            We believe your wardrobe should reflect your values, and that you can look good while glorifying God.
          </p>
          <p>
            From our signature faith-based tees to our statement hoodies, SAGE represents a lifestyle of walking in 
            purpose, dressed in faith. Join us in spreading the Gospel through fashion one outfit at a time.
          </p>
          <p className="text-xl font-semibold text-black italic text-center mt-8">
            &quot;Therefore, as God&apos;s chosen people, holy and dearly loved, clothe yourselves with compassion, 
            kindness, humility, gentleness and patience.&quot; - Colossians 3:12
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONTACT PAGE
// ============================================

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `*New Contact Form Submission*\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    window.open(`https://wa.me/2348137434165?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-black">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">Get in touch with the SAGE team</p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-black">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-1">Phone</h3>
                  <p className="text-gray-600">+234 813 743 4165</p>
                  <a
                    href="https://wa.me/2348137434165"
                    className="text-green-600 hover:text-green-700 font-semibold inline-block mt-2"
                  >
                    WhatsApp Us →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-1">Email</h3>
                  <p className="text-gray-600">support@sagewears.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-1">Location</h3>
                  <p className="text-gray-600">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="font-bold text-lg text-black mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/sagewearsbrand/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-3 rounded-lg hover:bg-black hover:text-white transition text-black"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.tiktok.com/@sagewearsbrand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-3 rounded-lg hover:bg-black hover:text-white transition text-black"
                >
                  <TikTokIcon />
                </a>
                <a
                  href="https://www.facebook.com/101567422567950"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-3 rounded-lg hover:bg-black hover:text-white transition text-black"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-black">Send Us A Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-black"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-black"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-black"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-black resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-lg text-lg font-bold hover:bg-gray-800 transition transform hover:scale-105"
              >
                Send Message via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedPage = localStorage.getItem('sage-current-page');
    const savedProduct = localStorage.getItem('sage-selected-product');
    
    if (savedPage) {
      setCurrentPage(savedPage);
    }
    
    if (savedProduct && (savedPage === 'product' || savedPage === 'shop')) {
      try {
        setSelectedProduct(JSON.parse(savedProduct));
      } catch (error) {
        console.error('Failed to load product:', error);
      }
    }
    
    setIsLoading(false);

    // Handle browser back button
    const handlePopState = () => {
      if (navigationHistory.length > 0) {
        navigationHistory.pop();
        const previousPage = navigationHistory[navigationHistory.length - 1] || 'home';
        setCurrentPage(previousPage);
        localStorage.setItem('sage-current-page', previousPage);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black font-semibold">Loading SAGE...</p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar setCurrentPage={setCurrentPage} />
        <main className="pt-20">
          {currentPage === 'home' && (
            <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />
          )}
          {currentPage === 'shop' && (
            <ShopPage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />
          )}
          {currentPage === 'product' && selectedProduct && (
            <ProductPage 
              product={selectedProduct} 
              setCurrentPage={setCurrentPage} 
              setSelectedProduct={setSelectedProduct}
            />
          )}
          {currentPage === 'cart' && (
            <CartPage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />
          )}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage />}
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </CartProvider>
  );
}
