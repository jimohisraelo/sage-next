import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartProvider from './context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SAGE - Where Faith Meets Fashion',
  description: 'Faith-inspired fashion for the modern believer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}