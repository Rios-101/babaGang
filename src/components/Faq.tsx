"use client"
import Image from "next/image";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { question: "What is Bobagency?", answer: "Bobagency is your go-to store for unique and trendy products." },
        { question: "When is our new releases?", answer: "We release new collections every month, stay tuned!" },
        { question: "Do you cover Nationwide Delivery?", answer: "Yes, we deliver nationwide with trusted couriers." },
        { question: "Can I order from US?", answer: "Yes, international orders are supported including the US." },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 ">
            <h2 className="text-2xl font-semibold mb-8">FAQs</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <Image
                    src="/images/faq.jpg"
                    alt="FAQ illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg"
                />
                {/* FAQ Section */}
                <div className="space-y-1">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border-b border-gray-300">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex justify-between items-center text-left py-5 text-gray-900 font-normal text-base hover:text-gray-600 transition-colors"
                            >
                                <span>{faq.question}</span>
                                <FiPlus className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === idx ? 'rotate-45' : ''}`} />
                            </button>
                            {openIndex === idx && (
                                <p className="pb-5 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
