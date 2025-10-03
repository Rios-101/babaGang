"use client";
import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface SortDropdownProps {
    options: string[];
    selected: string;
    onChange: (value: string) => void;
}

export default function SortDropdown({ options, selected, onChange }: SortDropdownProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={containerRef}>
            <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                onClick={() => setOpen((prev) => !prev)}
            >
                {selected} <FiChevronDown className="w-4 h-4" />
            </button>

            {open && (
                <div
                    className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 z-20 overflow-hidden"
                >
                    <ul className="divide-y divide-gray-200">
                        {options.map((opt) => (
                            <li key={opt}>
                                <button
                                    type="button"
                                    className={`w-full text-left px-4 py-2 text-sm ${opt === selected ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    onClick={() => {
                                        onChange(opt);
                                        setOpen(false);
                                    }}
                                >
                                    {opt}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
