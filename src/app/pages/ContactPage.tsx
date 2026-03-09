"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

// TikTok Icon Component
const TikTokIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

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
                  <p className="text-gray-600">sagewearsofficial@gmail.com</p>
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

export default ContactPage;