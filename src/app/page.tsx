"use client";

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const newDropSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const newDrops = [
    {
      id: 1,
      name: "Streetwear Hoodie",
      price: "$40",
      img: "/images/white1.jpg",
    },
    { id: 2, name: "Casual Tee", price: "$25", img: "/images/shirt2.jpg" },
    { id: 3, name: "Classic Jeans", price: "$50", img: "/images/shirt3.jpg" },
    { id: 4, name: "Summer Dress", price: "$60", img: "/images/tote1.jpg" },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ✅ Hero Slider */}
      <section className="w-full">
        <Slider {...heroSettings}>
          {["logo.jpg", "white1.jpg", "shirt2.jpg"].map((img, index) => (
            <div key={index} className="relative h-[calc(100vh-64px)] w-full">
              <Image
                src={`/images/${img}`}
                alt={`Brand ${index + 1}`}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-white text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
                  {index === 0 && "Discover Our Premium T-Shirts 👕"}
                  {index === 1 && "Stylish Denim Jackets 🧥"}
                  {index === 2 && "Elegant Dresses 👗"}
                </h2>
                <Link
                  href="/shop"
                  className="bg-white text-black px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-gray-200 transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ✅ New Drops Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-100 to-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">🔥 New Drops</h2>
        <Slider {...newDropSettings}>
          {newDrops.map((item) => (
            <div key={item.id} className="px-3">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden group transition-transform duration-500 transform hover:-translate-y-2">
                <div className="relative h-64 w-full">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition duration-700"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-semibold text-xl">{item.name}</h3>
                  <p className="text-gray-600">{item.price}</p>
                  <Link
                    href="/shop"
                    className="mt-3 inline-block bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ✅ About Section */}
      <section className="py-24 px-8 text-center w-full bg-gray-50">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <div className="max-w-5xl mx-auto">
          <p className="text-gray-700 text-xl leading-relaxed">
            We believe fashion should be stylish, comfortable, and affordable.
            Our mission is to bring you the best outfits that elevate your
            confidence and redefine your everyday look. Whether it&apos;s a casual
            streetwear vibe or a classy evening fit, our collections are
            designed with you in mind.
          </p>
        </div>
      </section>

      {/* ✅ Categories Section */}
      {/* <section className="py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
          {[
            { title: "T-Shirts", img: "/images/drop2.png" },
            { title: "Jeans", img: "/images/drop3.png" },
            { title: "Dresses", img: "/images/drop4.png" },
          ].map((cat, index) => (
            <div
              key={index}
              className="relative h-72 rounded-xl overflow-hidden shadow-lg group"
            >
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ✅ Why Choose Us */}
      <section className="py-24 px-8 text-center w-full bg-gradient-to-b from-white via-gray-700 to-black">
        <h2 className="text-4xl font-bold mb-12 text-black">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <div className="bg-white/90 border border-gray-200 rounded-xl p-8 hover:shadow-2xl transition">
            <h3 className="font-semibold text-xl mb-3">⭐ Premium Quality</h3>
            <p className="text-gray-700">
              We offer only the best fabrics and designs to ensure you look and
              feel great.
            </p>
          </div>
          <div className="bg-white/90 border border-gray-200 rounded-xl p-8 hover:shadow-2xl transition">
            <h3 className="font-semibold text-xl mb-3">🚚 Fast Delivery</h3>
            <p className="text-gray-700">
              Get your orders delivered quickly and safely, straight to your
              doorstep.
            </p>
          </div>
          <div className="bg-white/90 border border-gray-200 rounded-xl p-8 hover:shadow-2xl transition">
            <h3 className="font-semibold text-xl mb-3">💰 Affordable Prices</h3>
            <p className="text-gray-700">
              We believe style should be accessible to everyone without breaking
              the bank.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Footer CTA */}
      <section className="py-16 bg-black text-center text-white">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Elevate Your Style?
        </h2>
        <Link
          href="/shop"
          className="bg-white text-black px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-gray-200 transition"
        >
          🛍️ Start Shopping
        </Link>

        {/* Newsletter */}
        <div className="mt-8 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-lg w-72 text-white border border-gray-300"
          />
          <button className="px-4 py-2 bg-black text-white rounded-r-lg border border-gray-300 hover:bg-gray-800">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
