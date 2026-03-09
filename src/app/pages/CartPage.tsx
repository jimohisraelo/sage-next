"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingCart, ArrowLeft, Shield, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, products } from '../context/CartContext';

function CartPage() {
  const { cart, addToCart, removeOne, removeAll, clearCart } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="py-24 px-6 text-center min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <div className="h-8 bg-gray-200 rounded w-48 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-8 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;
  
  const cartProductIds = cart.map(item => item.id);
  const recommendedProducts = products
    .filter(product => !cartProductIds.includes(product.id))
    .slice(0, 4);

  const generateWhatsApp = () => {
    if (cart.length === 0) return '#';
    let msg = 'New Order from SAGE\n\n';
    cart.forEach((item) => {
      const isTuckerCap = item.id === 6;
      msg += `${item.quantity}x ${item.name}\n  ${isTuckerCap ? 'Color' : 'Size'}: ${item.size}\n  Price: ₦${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    msg += `Total: ₦${total.toLocaleString()}`;
    return `https://wa.me/2348137434165?text=${encodeURIComponent(msg)}`;
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 px-6 text-center min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="max-w-lg">
          <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h1 className="text-4xl font-bold mb-4 text-black">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-lg">Looks like you haven&apos;t added anything yet!</p>
          <button
            onClick={() => router.push('/shop')}
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
              
              {cart.map((item, idx) => {
                const isTuckerCap = item.id === 6;
                return (
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
                      <p className="text-gray-500 mb-2">
                        {isTuckerCap ? 'Color' : 'Size'}: <span className="font-semibold">{item.size}</span>
                      </p>
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
                );
              })}
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-black">You Might Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {recommendedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product?id=${product.id}`}
                      className="group cursor-pointer block"
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
                    </Link>
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
                  onClick={() => router.push('/shop')}
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

export default CartPage;