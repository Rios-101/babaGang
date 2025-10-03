import React from 'react'
import Link from 'next/link'

const Footer = () => {
    const footerLinks = {
        shop: [
            { name: "New Arrivals", href: "#" },
            { name: "Men", href: "#" },
            { name: "Women", href: "#" },
            { name: "Accessories", href: "#" },
        ],
        help: [
            { name: "Contact Us", href: "#" },
            { name: "FAQs", href: "#" },
            { name: "Shipping Info", href: "#" },
            { name: "Returns", href: "#" },
        ],
        about: [
            { name: "Our Story", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
        ],
    };

    return (
        <footer className="bg-primary-100 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">BABA GANG</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your destination for authentic streetwear and fashion. Quality guaranteed, style delivered.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2">
                            {footerLinks.shop.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="text-gray-300 hover:text-primary-200 text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Help</h4>
                        <ul className="space-y-2">
                            {footerLinks.help.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="text-gray-300 hover:text-primary-200 text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">About</h4>
                        <ul className="space-y-2">
                            {footerLinks.about.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="text-gray-300 hover:text-primary-200 text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} BABA GANG. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
