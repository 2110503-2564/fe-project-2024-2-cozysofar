export default function About() {
    return (
        <main className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">Welcome to CozyHotel</h1>
                    <p className="text-xl text-gray-300">Your Premier Destination for Luxury Hotel Reservations</p>
                </div>

                <div className="space-y-12">
                    <section className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Founded with a vision to revolutionize the hotel booking experience, CozyHotel has emerged as the industry leader in luxury hotel reservations. Our journey began with a simple belief where every traveler deserves an exceptional stay, and every hotel deserves to showcase its unique charm.
                        </p>
                    </section>

                    <section className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Exclusive Partnerships</h3>
                                <p className="text-gray-300">We've curated relationships with the world's most prestigious hotels, offering you access to exclusive rates and special amenities.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">24/7 Support</h3>
                                <p className="text-gray-300">Our dedicated team is always ready to assist you, ensuring a seamless booking experience from start to finish.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Best Price Guarantee</h3>
                                <p className="text-gray-300">We're committed to offering you the most competitive rates, backed by our price match guarantee.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Luxury Experience</h3>
                                <p className="text-gray-300">Every booking is crafted with attention to detail, ensuring your stay exceeds expectations.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                        <p className="text-gray-300 leading-relaxed">
                            At CozyHotel, we're dedicated to transforming ordinary hotel stays into extraordinary experiences. Our mission is to connect discerning travelers with exceptional accommodations while providing unparalleled service and support throughout their journey.
                        </p>
                    </section>

                    <section className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-4">Join Our Journey</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Whether you're planning a romantic getaway, a family vacation, or a business trip, CozyHotel is your trusted partner in creating unforgettable hotel experiences. Start your journey with us today and discover why we're the preferred choice for luxury hotel reservations worldwide.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}