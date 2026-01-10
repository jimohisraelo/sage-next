"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { slideshowImages } from '../context/CartContext';

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

export default Slideshow;