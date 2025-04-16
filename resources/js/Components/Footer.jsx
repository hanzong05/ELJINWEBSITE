import React from 'react';
import { Link } from '@inertiajs/react';

// This component accepts props to customize the content for different pages
const Footer = ({ 
  title = "Ready to Experience Our Baked Creations?",
  description = "Visit our shop or order online to taste the stories we've been baking for you.",
  primaryButtonText = "Order Online",
  primaryButtonUrl = "/order",
  secondaryButtonText = "Find Our Shop",
  secondaryButtonUrl = "/locations",
  backgroundClass = "bg-black/70 backdrop-blur-md"
}) => {
  // Define the gradient for the primary button text
  const textGradient = 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500';

  return (
    <section className={`py-16 ${backgroundClass} text-white text-center`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href={primaryButtonUrl}
            className={`bg-white px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors ${textGradient}`}
          >
            {primaryButtonText}
          </Link>
          <Link 
            href={secondaryButtonUrl}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;