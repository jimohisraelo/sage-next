"use client";

import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

function Toast({ message, show, onClose }: { message: string; show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-24 right-6 z-50 animate-slideIn">
      <div className="bg-black text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
        <Check className="w-5 h-5 text-green-400" />
        <span className="font-semibold">{message}</span>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Toast;