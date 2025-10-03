import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

export default function Collection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Our Collection</h2>
                <a href="#" className="text-sm text-red-500 hover:underline flex items-center gap-1">
                    View all <span className="text-lg">+</span>
                </a>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Big Promo Card */}
                <div className="relative  rounded-xl overflow-hidden">
                    <Image
                        src="/images/landing.jpg" // replace with your image
                        alt="Promo"
                        width={800}
                        height={500}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6 text-white">
                        <div className="bg-primary-200 px-3 py-1 w-fit text-lg font-semibold rounded-full mb-3">
                            WORLD GIRLFRIEND’S DAY
                        </div>
                        <div>
                            <h3 className="text-4xl font-semibold mb-2">
                                Free Delivery on all Items <br /> ordered until November 30
                            </h3>
                            <p className="text-lg">All the sleekest Item for you to twin with your girlfriends.</p>
                            <button className="bg-black cursor-pointer flex items-center gap-1 mt-4 text-white px-4 py-2 rounded-md text-sm w-fit hover:bg-gray-800">
                                Shop now
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Small Card 1 */}
                <div className="gap-2 flex flex-col">
                    <div className="rounded-xl overflow-hidden">
                        <Image
                            src="/images/landing1.png"
                            alt="Collection Item 1"
                            width={400}
                            height={250}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Small Card 2 */}
                    <div className="rounded-xl overflow-hidden">
                        <Image
                            src="/images/landing3.png"
                            alt="Collection Item 2"
                            width={400}
                            height={250}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
