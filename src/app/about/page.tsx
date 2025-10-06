"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section with Overlay */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <Image
          src="/images/vision.jpg" // replace with your hero image in /public
          alt="Our Story"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-5xl md:text-6xl font-bold text-white text-center">
          OUR STORY
        </h1>
      </section>

      {/* Scrolling Text Section */}
      <section className="overflow-hidden border-y py-6 bg-gray-50">
        <div className="whitespace-nowrap animate-marquee text-4xl font-bold uppercase tracking-wide">
          <span className="mx-8">SAGE BY AYOTHESAGE</span>
          <span className="mx-8">SAGE BY AYOTHESAGE</span>
          <span className="mx-8">SAGE BY AYOTHESAGE</span>
          <span className="mx-8">SAGE BY AYOTHESAGE</span>
        </div>
      </section>

      {/* Intro Text */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <p className="text-lg md:text-xl leading-relaxed">
          At <span className="font-semibold">SAGE BY AYOTHESAGE</span>, we
          believe fashion is an expression of individuality and artistry. Every
          garment is crafted with sophistication and attention to detail, making
          each piece a timeless masterpiece.
        </p>
      </section>

      {/* Image with Text Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto py-16 px-6">
        {/* Image */}
        <div className="relative w-full h-[500px]">
          <Image
            src="/images/begin.jpg" // replace with actual image
            alt="Designer"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Beginning</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Founded in 2019 by <span className="font-semibold">Rahman Jago</span>,
            High Fashion by J.O.L was born from a passion for luxury fashion and
            the spirit of street style. Our vision is to redefine elegance while
            celebrating creativity across borders and beyond.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold mb-6">The Visionary</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Inspired by the flair of street fashion, our founder blends artistry
            with craftsmanship to create collections that resonate globally. Each
            design reflects love, dedication, and a drive to set new standards in
            fashion.
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full h-[500px]">
          <Image
            src="/images/vision.jpg" // replace with actual founder image
            alt="Founder"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
    </main>
  );
}
