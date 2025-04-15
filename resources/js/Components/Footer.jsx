import React from 'react';
import { Link } from '@inertiajs/react';

// This component extracts the Call to Action section into a reusable footer
const Footer = () => {
  // Define the gradient for the "Order Online" text
  const textGradient = 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500';

  return (
    <section className="py-16 bg-black/70 backdrop-blur-md text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Ready to Experience Our Baked Creations?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Visit our shop or order online to taste the stories we've been baking for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/order"
            className={`bg-white px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors ${textGradient}`}
          >
            Order Online
          </Link>
          <Link 
            href="/locations"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            Find Our Shop
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;