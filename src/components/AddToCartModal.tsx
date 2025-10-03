"use client"
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiCheck, FiShoppingCart } from "react-icons/fi";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
  };
}

export default function AddToCartModal({ isOpen, onClose, product }: AddToCartModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-6 mx-4 max-w-md w-full shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Success icon */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FiCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
          Added to Cart!
        </h2>

        {/* Product info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
          <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
            <p className="text-sm text-gray-600">Size: {product.size}</p>
            <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
            <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Link
            href="/cart"
            className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            onClick={onClose}
          >
            <FiShoppingCart className="w-4 h-4" />
            View Cart
          </Link>
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-900 py-3 px-6 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}