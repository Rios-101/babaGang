import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
    const contactInfo = [
        { icon: <FaEnvelope size={24} />, title: "Email", detail: "1thebabagang@gmail.com" },
        { icon: <FaMapMarkerAlt size={24} />, title: "Address", detail: "210-765 rue Bourget, Montreal, Quebec H4C 2M5" },
    ];

    const socialMedia = [
        // { icon: <FaFacebook size={24} />, link: "#" },
        { icon: <FaInstagram size={24} />, link: "https://www.instagram.com/1thebabagang?igsh=ZHBmczNreHNmbXQ5&utm_source=qr" },
        // { icon: <FaTwitter size={24} />, link: "#" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 mb-24 py-16 bg-gray-50">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">You Can Reach Us Here</h2>
                <p className="text-gray-600">We&apos;d love to hear from you. Get in touch with us!</p>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mb-12">
                {contactInfo.map((contact, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-primary-200 mb-4">{contact.icon}</div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">{contact.title}</h3>
                        <p className="text-sm text-gray-600">{contact.detail}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-6">
                {socialMedia.map((social, idx) => (
                    <a
                        key={idx}
                        href={social.link}
                        className="text-gray-700 hover:text-primary-200 transition-colors"
                        aria-label="Social media link"
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        </section>
    )
}

export default Contact
