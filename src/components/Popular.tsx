"use client"
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { BsGrid3X3Gap, BsList } from "react-icons/bs";
import { useState, useEffect } from "react";
import SortDropdown from "./SortDropdown";
import Link from "next/link";

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
    __v?: number;
}

export default function Popular() {
    const [sortBy, setSortBy] = useState("Default");
    const [products, setProducts] = useState<Product[]>([]);
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const options = ["Default", "Availability", "Price"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://babagang.onrender.com/v1/products?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();

                // Handle different response structures
                const productsData = Array.isArray(data) ? data : (data.data || data.products || []);
                setProducts(productsData);
                setOriginalProducts(productsData);

                // Extract pagination info if available
                if (data.totalPages) {
                    setTotalPages(data.totalPages);
                }

                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    // Handle sorting
    useEffect(() => {
        let sortedProducts = [...originalProducts];

        switch (sortBy) {
            case "Price":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "Availability":
                sortedProducts.sort((a, b) => b.inStock - a.inStock);
                break;
            case "Default":
            default:
                sortedProducts = [...originalProducts];
                break;
        }

        setProducts(sortedProducts);
    }, [sortBy, originalProducts]);

    return (
        <section id="popular" className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <h2 className="text-xl font-semibold">Popular</h2>

                {/* Filters + Sort */}
                <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-6 text-sm text-gray-600">
                    {/* Right sort using SortDropdown */}
                    <div className="flex items-center gap-6">
                        <span className="hidden md:inline"> {products.length} Items </span>
                        <SortDropdown options={options} selected={sortBy} onChange={(val) => setSortBy(val)} />
                    </div>
                </div>
            </div>

            {/* Loading State - Skeleton */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, idx) => (
                        <div key={idx} className="animate-pulse">
                            <div className="bg-gray-200 rounded-lg h-[400px] w-full"></div>
                            <div className="mt-3 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-20 text-red-500">
                    <p>Error loading products: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Product Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Link key={product._id} href={`/product/${product._id}`}>
                            <div className="group cursor-pointer">
                                <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-[400px]">
                                    <Image
                                        src={product.images[0] || "/images/placeholder.png"}
                                        alt={product.name}
                                        width={300}
                                        height={400}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="mt-3">
                                    <h3 className="text-sm font-medium">{product.name}</h3>
                                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                                    {product.inStock > 0 ? (
                                        <p className="text-xs text-green-600 mt-1">In Stock</p>
                                    ) : (
                                        <p className="text-xs text-red-600 mt-1">Out of Stock</p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p>No products available at the moment.</p>
                </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                        Previous
                    </button>

                    <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, idx) => {
                            const pageNum = idx + 1;
                            // Show first page, last page, current page, and pages around current
                            if (
                                pageNum === 1 ||
                                pageNum === totalPages ||
                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-4 py-2 rounded-md border transition-colors ${
                                            currentPage === pageNum
                                                ? "bg-black text-white border-black"
                                                : "border-gray-300 hover:bg-gray-100"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            } else if (
                                pageNum === currentPage - 2 ||
                                pageNum === currentPage + 2
                            ) {
                                return <span key={pageNum} className="px-2 py-2">...</span>;
                            }
                            return null;
                        })}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}
