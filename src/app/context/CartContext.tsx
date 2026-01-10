"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

export const products = [
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
    sizes: ["Black/White", "Red", "Navy", "Khaki", "Brown"],
    description: "Classic two-tone cap with adjustable strap and Classic design.",
    features: ["Two-Tone Design", "Adjustable Strap", "Structured Crown", "Available in Multiple Colors"]
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

export const slideshowImages = [
  "/images/sp1.jpg",
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
  "/images/slide4.jpg",
  "/images/slide5.jpg",
  "/images/slide6.jpg",
  "/images/slide7.jpg",
  "/images/slide8.jpg",
];

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
    if (isClient) {
      localStorage.setItem('sage-cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

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

export default CartProvider;
export { useCart, type Product };