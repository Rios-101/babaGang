import React from 'react'
import { FaBox, FaSmile, FaCalendarAlt, FaShippingFast } from "react-icons/fa";


const Features = () => {


    const features = [
        { icon: <FaBox size={32} />, title: "Original Products", desc: "We guarantee the quality and genuineness of the products we sell." },
        { icon: <FaSmile size={32} />, title: "Satisfaction Guarantee", desc: "We ensure money-back guarantee if the product is counterfeit." },
        { icon: <FaCalendarAlt size={32} />, title: "New Arrival Everyday", desc: "Fresh picks added daily to keep your style on point." },
        { icon: <FaShippingFast size={32} />, title: "Fast Free Shipping", desc: "We provide fast & free nationwide delivery for our customers." },
    ];


    return (
        <section className="max-w-7xl mx-auto px-6 py-16 ">
            {/* Features Section */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-12">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-start text-left">
                        <div className="text-gray-800 mb-4">{feature.icon}</div>
                        <h3 className="text-base font-semibold mb-2 text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features