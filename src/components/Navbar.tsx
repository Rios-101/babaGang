"use client";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useRouter, usePathname } from "next/navigation";
import { MouseEvent } from "react";

export default function Navbar() {
    const { state } = useCart();
    const router = useRouter();
    const pathname = usePathname();

    const handleExclusiveClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (pathname === "/") {
            // Already on home page → smooth scroll
            const element = document.getElementById("popular");
            element?.scrollIntoView({ behavior: "smooth" });
        } else {
            // Navigate to home with hash → Next.js will take you there
            router.push("/#popular");
        }
    };

    return (
        <header className="w-full bg-primary-100 text-white fixed top-0 left-0 z-20">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Left spacer */}
                <div className="w-1/3"></div>

                {/* Center nav links */}
                <nav className="flex gap-8 text-sm font-medium justify-start w-1/3">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <button onClick={handleExclusiveClick} className="hover:underline">
                        Exclusive
                    </button>
                </nav>

                {/* Right search + icons */}
                <div className="flex items-center gap-4 w-1/3 justify-end">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-black border border-gray-500 text-white px-3 py-1 rounded-md text-sm placeholder-gray-400 focus:outline-none"
                        />
                        <FiSearch className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <Link href="/cart" className="relative">
                        <FiShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                        {state.itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {state.itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
