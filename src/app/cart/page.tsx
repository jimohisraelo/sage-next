"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    addToCart,
    removeOneFromCart,
    removeAllOfItem,
    clearCart,
  } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Generate WhatsApp link with sizes
  const generateWhatsAppLink = () => {
    if (cart.length === 0) return "#";

    let message = "Hello, I’d like to place an order:\n";
    cart.forEach((item) => {
      message += `- ${item.quantity} × ${item.name} (Size: ${item.size}) - $${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });
    message += `\nTotal: $${total.toFixed(2)}`;

    const phoneNumber = "2348012345678";
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">
          Your cart is empty.{" "}
          <Link href="/shop" className="text-blue-600 hover:underline">
            Go shopping
          </Link>
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${item.size}-${index}`} // ✅ Differentiate by size
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-gray-600">
                    ${item.price} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => removeOneFromCart(item.id, item.size)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  ➖
                </button>
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  ➕
                </button>
                <button
                  onClick={() => removeAllOfItem(item.id, item.size)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}

          {/* Footer Section */}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Clear Cart
              </button>
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
