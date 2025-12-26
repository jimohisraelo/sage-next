"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ShoppingCart, Menu, X, Instagram, Facebook, Truck, Shield, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component

// ============================================
// PRODUCTS DATA
// ============================================

const products = [
  {
    id: 1,
    name: "Classic Black Tee",
    price: 25,
    category: "shirts",
    image: "/images/shirt1.jpg",
    hoverImage: "/images/shirt2.jpg",
    sizes: ["S", "M", "L", "XL"],
    description: "Premium cotton T-shirt with a classic fit. Soft, breathable, and perfect for everyday wear."
  },
  {
    id: 2,
    name: "White Essential Tee",
    price: 25,
    category: "shirts",
    image: "/images/white1.jpg",
    hoverImage: "/images/white3.jpg",
    sizes: ["S", "M", "L", "XL"],
    description: "A wardrobe staple. Clean, minimalist, and endlessly versatile."
  },
  {
    id: 3,
    name: "Oversized Black Hoodie",
    price: 45,
    category: "hoodies",
    image: "/images/hoodie1.jpg",
    hoverImage: "/images/hoodie3.jpg",
    sizes: ["S", "M", "L", "XL"],
    description: "Ultra-comfortable oversized hoodie with premium fleece lining."
  },
  {
    id: 4,
    name: "Full Black Cap",
    price: 20,
    category: "caps",
    image: "/images/blackcap1.jpg",
    hoverImage: "/images/blackcap2.jpg",
    sizes: ["One Size"],
    description: "Adjustable snapback cap with embroidered logo."
  },
  {
    id: 5,
    name: "Canvas Tote Bag",
    price: 18,
    category: "bags",
    image: "/images/tote1.jpg",
    hoverImage: "/images/vision.jpg",
    sizes: ["One Size"],
    description: "Durable canvas tote with reinforced handles. Perfect for everyday use."
  },
  {
    id: 6,
    name: "White & Black Cap",
    price: 20,
    category: "caps",
    image: "/images/cap1.jpg",
    hoverImage: "/images/cap2.jpg",
    sizes: ["One Size"],
    description: "Classic two-tone cap with adjustable strap."
  },
  {
    id: 7,
    name: "Black Beanie",
    price: 15,
    category: "bonnets",
    image: "/images/beanie1.jpg",
    hoverImage: "/images/beanie2.jpg",
    sizes: ["One Size"],
    description: "Soft knit beanie to keep you warm in style."
  },
  {
    id: 8,
    name: "Striped Polo Shirt",
    price: 35,
    category: "shirts",
    image: "/images/polo1.jpg",
    hoverImage: "/images/polo2.jpg",
    sizes: ["S", "M", "L", "XL"],
    description: "Classic polo with modern stripes. Smart casual perfection."
  }
];

// ============================================
// CART CONTEXT
// ============================================

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  category: string;
  sizes: string[];
  description: string;
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
        console.error('Failed to load cart', error);
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
// NAVBAR COMPONENT
// ============================================

function Navbar({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-black shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div onClick={() => setCurrentPage('home')} className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
            S
          </div>
          <span className="text-2xl font-bold text-white">SAGE</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-white">
          <button onClick={() => setCurrentPage('home')} className="hover:text-gray-300 font-medium transition">
            Home
          </button>
          <button onClick={() => setCurrentPage('shop')} className="hover:text-gray-300 font-medium transition">
            Shop
          </button>
          <button onClick={() => setCurrentPage('about')} className="hover:text-gray-300 font-medium transition">
            About
          </button>
          <a
            href="https://wa.me/2348137434165"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium"
          >
            WhatsApp Order
          </a>
          <button onClick={() => setCurrentPage('cart')} className="relative">
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
          <button onClick={() => { setCurrentPage('home'); setMobileOpen(false); }} className="block w-full text-left">
            Home
          </button>
          <button onClick={() => { setCurrentPage('shop'); setMobileOpen(false); }} className="block w-full text-left">
            Shop
          </button>
          <button onClick={() => { setCurrentPage('about'); setMobileOpen(false); }} className="block w-full text-left">
            About
          </button>
          <a href="https://wa.me/2348137434165" className="block bg-green-500 text-white px-4 py-2 rounded-lg text-center">
            WhatsApp
          </a>
          <button onClick={() => { setCurrentPage('cart'); setMobileOpen(false); }} className="block w-full text-left">
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

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">SAGE</h3>
            <p className="text-sm">Elevated street fashion for the modern individual.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <p className="hover:text-white cursor-pointer transition">Privacy Policy</p>
              <p className="hover:text-white cursor-pointer transition">Terms of Service</p>
              <p className="hover:text-white cursor-pointer transition">Shipping Info</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">
                <Instagram />
              </a>
              <a href="#" className="hover:text-white transition">
                <Facebook />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SAGE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// HOME PAGE
// ============================================

function HomePage({ setCurrentPage, setSelectedProduct }: { setCurrentPage: (page: string) => void; setSelectedProduct: (product: Product) => void }) {
  const featured = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">SAGE</h1>
          <p className="text-2xl md:text-3xl mb-4 text-gray-300 font-light">Elevated Street Fashion</p>
          <p className="text-lg md:text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
            Where contemporary design meets timeless style. Discover pieces that define you.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-white text-black px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-200 transition transform hover:scale-105"
          >
            Shop Collection
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <Truck className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">On orders over $50</p>
          </div>
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">100% secure transactions</p>
          </div>
          <div className="text-center">
            <Star className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-sm">Top-tier materials</p>
          </div>
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Trending Styles</h3>
            <p className="text-gray-600 text-sm">Latest fashion drops</p>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 px-6 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Featured Collection</h2>
          <p className="text-gray-600 text-lg">Handpicked styles just for you</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setCurrentPage('product');
              }}
              className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <Image
                  src={product.hoverImage}
                  alt={product.name}
                  fill
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                <p className="text-lg font-semibold text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">New Arrivals</h2>
          <p className="text-gray-600 text-lg">Fresh drops you can&apos;t miss</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setCurrentPage('product');
              }}
              className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="relative h-80 overflow-hidden">
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  NEW
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <Image
                  src={product.hoverImage}
                  alt={product.name}
                  fill
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                <p className="text-lg font-semibold text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">Our Philosophy</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            SAGE represents the intersection of timeless design and contemporary streetwear.
            Every piece is crafted with attention to detail, quality materials, and a vision
            to empower your personal style.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            We believe fashion is more than clothing—it&apos;s self-expression, confidence, and individuality.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join the SAGE Community</h2>
          <p className="text-lg text-gray-700 mb-8">
            Be the first to know about new drops, exclusive deals, and style tips.
          </p>
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
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
    { id: 'bonnets', name: 'Bonnets' },
  ];

  const filtered =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-24 px-6 min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-center mb-4">Shop Collection</h1>
      <p className="text-center text-gray-600 mb-12 text-lg">Discover your next favorite piece</p>

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
            onClick={() => {
              setSelectedProduct(product);
              setCurrentPage('product');
            }}
            className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="relative h-80 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <Image
                src={product.hoverImage}
                alt={product.name}
                fill
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-lg font-semibold text-gray-900">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// PRODUCT PAGE
// ============================================

function ProductPage({ product, setCurrentPage }: { product: Product; setCurrentPage: (page: string) => void }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [currentImage, setCurrentImage] = useState(product.image);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    alert(`Added ${product.name} (${selectedSize}) to cart!`);
  };

  return (
    <div className="py-24 px-6 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <div className="relative h-[600px] mb-4 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex gap-4">
            <div
              onClick={() => setCurrentImage(product.image)}
              className={`relative w-24 h-24 cursor-pointer border-4 transition rounded-lg ${
                currentImage === product.image ? 'border-black' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image
                src={product.image}
                alt="View 1"
                fill
                className="object-cover rounded-lg"
                sizes="96px"
              />
            </div>
            <div
              onClick={() => setCurrentImage(product.hoverImage)}
              className={`relative w-24 h-24 cursor-pointer border-4 transition rounded-lg ${
                currentImage === product.hoverImage ? 'border-black' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image
                src={product.hoverImage}
                alt="View 2"
                fill
                className="object-cover rounded-lg"
                sizes="96px"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-4xl font-bold mb-8">${product.price}</p>
          <p className="text-gray-700 text-lg mb-10 leading-relaxed">{product.description}</p>

          <div className="mb-10">
            <label className="block font-bold mb-4 text-xl">Select Size:</label>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-8 py-4 border-2 rounded-lg font-bold transition transform hover:scale-105 ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-5 rounded-lg text-xl font-bold hover:bg-gray-800 transition transform hover:scale-105 shadow-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className="w-full border-2 border-black text-black py-5 rounded-lg text-xl font-bold hover:bg-gray-100 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CART PAGE
// ============================================

function CartPage() {
  const { cart, addToCart, removeOne, removeAll, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + shipping;

  const generateWhatsApp = () => {
    if (cart.length === 0) return '#';
    let msg = 'New Order from SAGE\n\n';
    cart.forEach((item) => {
      msg += `${item.quantity}x ${item.name}\n  Size: ${item.size}\n  Price: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    msg += `Subtotal: $${subtotal.toFixed(2)}\n`;
    msg += `Shipping: $${shipping.toFixed(2)}\n`;
    msg += `Total: $${total.toFixed(2)}`;
    return `https://wa.me/2348137434165?text=${encodeURIComponent(msg)}`;
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 px-6 text-center min-h-screen bg-gray-50 flex items-center justify-center">
        <div>
          <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-lg">Looks like you haven&apos;t added anything yet!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-center mb-4">Shopping Cart</h1>
      <p className="text-center text-gray-600 mb-12 text-lg">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
      
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {cart.map((item, idx) => (
            <div key={`${item.id}-${item.size}-${idx}`} className="flex items-center gap-6 pb-8 mb-8 border-b last:border-b-0 last:pb-0 last:mb-0">
              <div className="relative w-32 h-32">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg shadow-md"
                  sizes="128px"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-2xl mb-1">{item.name}</h3>
                <p className="text-gray-500 mb-2">Size: <span className="font-semibold">{item.size}</span></p>
                <p className="text-lg font-semibold text-gray-900">
                  ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => removeOne(item.id, item.size)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition font-bold text-xl"
                >
                  -
                </button>
                <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item, item.size)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition font-bold text-xl"
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

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {subtotal > 0 && subtotal < 50 && (
              <p className="text-sm text-gray-500">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
            )}
            <div className="border-t pt-4 flex justify-between text-2xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
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
              onClick={clearCart}
              className="w-full bg-gray-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-600 transition"
            >
              Clear Cart
            </button>
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
        <h1 className="text-5xl font-bold text-center mb-12">About SAGE</h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Founded in 2019, SAGE represents a new wave of streetwear that blends sophistication
            with urban culture. Our mission is to create clothing that empowers individuals to
            express their unique identity.
          </p>
          <p>
            Every piece in our collection is thoughtfully designed and crafted with premium materials.
            We believe fashion should be accessible, sustainable, and timeless.
          </p>
          <p>
            From our signature tees to our statement outerwear, SAGE is more than clothing—it&apos;s
            a lifestyle, a community, and a movement toward conscious fashion.
          </p>
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
            <ProductPage product={selectedProduct} setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 'cart' && <CartPage />}
          {currentPage === 'about' && <AboutPage />}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
