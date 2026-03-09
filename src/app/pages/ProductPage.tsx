"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { ShoppingCart, ArrowLeft, Check, Shield, Package, Star, Truck } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart, products } from '../context/CartContext';
import Toast from '../components/Toast';

function ProductPageContent() {
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get('id');

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes[0]);
      }
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Product not found</h1>
        <button 
          onClick={() => router.push('/shop')}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const recommendedProducts = [
    ...products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 2),
    ...products.filter(p => p.id !== product.id && p.category !== product.category).slice(0, 2)
  ];

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      setShowToast(true);
    }
  };

  const colorStyles: Record<string, string> = {
    "Black/White": "border-gray-900 bg-gradient-to-r from-gray-900 to-gray-100",
    "Red": "border-red-600 bg-gradient-to-r from-red-600 to-red-400",
    "Navy": "border-blue-900 bg-gradient-to-r from-blue-900 to-blue-600",
    "Khaki": "border-yellow-800 bg-gradient-to-r from-yellow-800 to-yellow-400",
    "Brown": "border-amber-900 bg-gradient-to-r from-amber-900 to-amber-600"
  };

  const isTuckerCap = product.id === 6;

  return (
    <div className="py-24 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
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
              {product.images.map((img: string, index: number) => (
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
                  {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size/Color Selection */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="font-bold text-xl text-black">
                  {isTuckerCap ? 'Select Color:' : 'Select Size:'}
                </label>
                <button className="text-sm text-gray-600 hover:text-black transition">
                  {isTuckerCap ? 'Color Guide' : 'Size Guide'}
                </button>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      px-8 py-4 rounded-lg font-bold transition transform hover:scale-105
                      ${isTuckerCap 
                        ? `border-4 ${colorStyles[size] || 'border-gray-300'} ${selectedSize === size ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''} text-white shadow-lg hover:shadow-xl` 
                        : `border-2 ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black text-black'}`
                      }
                    `}
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
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-5 rounded-lg text-xl font-bold transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 ${
                  selectedSize 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {selectedSize ? `Add to Cart - ₦${(product.price * quantity).toLocaleString()}` : 'Select a size/color'}
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/2348137434165?text=${encodeURIComponent(`I want to order: ${product.name} (${isTuckerCap ? 'Color' : 'Size'}: ${selectedSize}, Quantity: ${quantity})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition text-center"
                >
                  Buy on WhatsApp
                </a>
                <button
                  onClick={() => router.push('/shop')}
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
                onClick={() => router.push(`/product?id=${recommendedProduct.id}`)}
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
                  <div className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                    View Product
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast 
        message={`Added ${product.name} (${selectedSize}) to cart!`} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-black font-semibold">Loading product...</p>
      </div>
    }>
      <ProductPageContent />
    </Suspense>
  );
}