"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiMinus, FiPlus, FiStar, FiTruck } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import AddToCartModal from "@/components/AddToCartModal";
import SizeWarningModal from "@/components/SizeWarningModal";

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  size: string[];
  inStock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://babagang.onrender.com/v1/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const result = await response.json();
        setProduct(result.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left skeleton */}
            <div className="space-y-6 animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-[600px]"></div>
              <div className="flex space-x-3">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="w-20 h-20 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
            {/* Right skeleton */}
            <div className="space-y-6 animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {error || "Product not found"}
          </h1>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, product.inStock)));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeWarning(true);
      return;
    }

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
    });

    setShowModal(true);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowSizeWarning(true);
      return;
    }

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
    });

    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6 pt-20">
        <div className="flex items-center text-sm text-gray-600 space-x-2 font-medium">
          <span className="hover:text-gray-900 cursor-pointer transition-colors">Home</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left side - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center h-96 lg:h-[600px] border border-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={400}
                height={500}
                className="object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 justify-center lg:justify-start">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-white rounded-xl overflow-hidden flex items-center justify-center border-2 transition-all duration-200 hover:shadow-md ${
                    selectedImage === index 
                      ? 'border-black shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className="space-y-8 lg:pl-8">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-4">
                ✨ Best Seller
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{product.name}</h1>
              <p className="text-gray-600 mt-4 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                💳 Suggested payments with 6 months special financing
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Select Size</span>
                <button className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors">
                  📏 Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.size.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border-2 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-black text-white border-black shadow-lg transform scale-105'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-md bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <span className="text-lg font-semibold text-gray-900">Quantity</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white shadow-sm">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <FiMinus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 min-w-[4rem] text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= product.inStock}
                  >
                    <FiPlus className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="text-sm text-orange-800 font-medium">
                    ⚡ Only <span className="font-bold">{product.inStock} items</span> left!
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    Don&apos;t miss out - grab yours now!
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                🚀 Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full border-2 border-gray-300 text-gray-900 py-4 px-8 rounded-2xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                🛍️ Add to Cart
              </button>
            </div>

            {/* Free Delivery */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FiTruck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">🎁 Free Delivery</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Enter your Postal Code for Delivery Availability
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={{
          name: product.name,
          price: product.price,
          image: product.images[0],
          size: selectedSize,
          quantity: quantity,
        }}
      />

      {/* Size Warning Modal */}
      <SizeWarningModal
        isOpen={showSizeWarning}
        onClose={() => setShowSizeWarning(false)}
      />
    </div>
  );
}