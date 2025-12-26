import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAGE - Elevated Street Fashion",
  description: "Premium streetwear and contemporary fashion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}