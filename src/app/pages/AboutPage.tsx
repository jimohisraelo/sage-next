"use client";

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

export default AboutPage;