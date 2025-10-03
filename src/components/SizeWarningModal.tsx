"use client"
import { useEffect } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

interface SizeWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeWarningModal({ isOpen, onClose }: SizeWarningModalProps) {
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
      <div className="relative bg-white rounded-2xl p-6 mx-4 max-w-sm w-full shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Warning icon */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <FiAlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
          Size Required
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          Please select a size before adding this item to your cart.
        </p>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}