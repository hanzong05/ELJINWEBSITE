import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaHeart, FaCoffee, FaLeaf, FaSnowflake, FaCheese, FaCookieBite } from 'react-icons/fa';
import { BsHeartFill } from 'react-icons/bs';
import { GiAlarmClock, GiOven } from 'react-icons/gi';

const ProductDetails = ({ product }) => {
  // Default product if none is provided
  const defaultProduct = {
    id: 'ube-cheese-ensaymada',
    name: 'Ube Cheese Ensaymada',
    description: 'Soft, buttery swirl topped with real ube halaya and shredded cheese – a Filipino favorite with a creamy twist.',
    price: '₱49',
    boxPrice: '₱280',
    images: [
      '/api/placeholder/600/500',
      '/api/placeholder/600/500',
      '/api/placeholder/600/500'
    ],
    tags: ['Bestseller', 'Customer Favorite'],
    flavorProfile: [
      { name: 'Buttery', icon: <FaCookieBite /> },
      { name: 'Real Cheese', icon: <FaCheese /> },
      { name: 'Filipino Favorite', icon: <FaLeaf /> },
      { name: 'Good Chilled', icon: <FaSnowflake /> },
      { name: 'Perfect with Coffee', icon: <FaCoffee /> }
    ],
    reviews: {
      average: 4.9,
      count: 45,
      featured: "Softest bread I've ever had. Like a warm hug!"
    },
    allergens: ['dairy', 'gluten'],
    shelfLife: '3 days at room temp',
    storage: 'Refrigerate for longer freshness',
    freshlyBaked: '5:00 AM',
    relatedProducts: [
      { id: 'ube-cheese-loaf', name: 'Ube Cheese Loaf', price: '₱120', image: '/api/placeholder/200/200' },
      { id: 'choco-crinkles', name: 'Choco Crinkles', price: '₱15', image: '/api/placeholder/200/200' },
      { id: 'classic-ensaymada', name: 'Classic Ensaymada', price: '₱40', image: '/api/placeholder/200/200' },
      { id: 'coffee-sachet', name: 'Brewed Coffee Sachet Box', price: '₱180', image: '/api/placeholder/200/200' }
    ]
  };

  // Merge provided product with default values
  const productData = { ...defaultProduct, ...product };
  
  // State for quantity and active image
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Handle add to cart with heart animation
  const handleAddToCart = () => {
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 1000);
    
    // Here you would actually add the item to cart
    console.log(`Added ${quantity} ${productData.name} to cart`);
  };

  return (
    <div className="bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Product Images */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-md mb-4 bg-white">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={productData.images[activeImageIndex]} 
                  alt={productData.name} 
                  className="w-full h-auto object-cover cursor-pointer transform transition-transform hover:scale-105"
                />
                
                {/* Product Labels */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {productData.tags.includes('Bestseller') && (
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center">
                      🌟 Bestseller
                    </span>
                  )}
                  {productData.tags.includes('New') && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center">
                      🆕 Just Baked
                    </span>
                  )}
                  {productData.tags.includes('Customer Favorite') && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center">
                      ❤️ Customer Favorite
                    </span>
                  )}
                </div>
                
                {/* Freshly Baked Time */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs flex items-center shadow-md">
                    <GiOven className="mr-1" /> Freshly baked every {productData.freshlyBaked}
                  </div>
                </div>
              </motion.div>
              
              {/* Heart Animation when adding to cart */}
              {showHeartAnimation && (
                <motion.div 
                  initial={{ scale: 0, y: 100, opacity: 0 }}
                  animate={{ scale: 1.5, y: -100, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <BsHeartFill className="text-red-500 text-6xl" />
                </motion.div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {productData.images.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    index === activeImageIndex ? 'border-purple-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${productData.name} - view ${index + 1}`} 
                    className="w-16 h-16 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Product Information */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
              {productData.name}
            </h1>
            
            <p className="text-gray-600 mb-6 text-lg">
              {productData.description}
            </p>
            
            {/* Price Display */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">{productData.price}</span>
                <span className="text-gray-600 ml-2">/ piece</span>
              </div>
              {productData.boxPrice && (
                <div className="text-gray-600 mt-1">
                  Also available in a box of 6 for {productData.boxPrice}
                </div>
              )}
            </div>
            
            {/* Quantity Picker + Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                  <button 
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-medium text-gray-900">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="ml-4 flex-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  🍞 Add to Pasalubong
                </button>
              </div>
            </div>
            
            {/* Flavor Profile */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Flavor Profile</h3>
              <div className="flex flex-wrap gap-2">
                {productData.flavorProfile.map((flavor, index) => (
                  <div 
                    key={index}
                    className="bg-white px-3 py-2 rounded-full text-sm border border-gray-200 shadow-sm flex items-center text-gray-700 hover:shadow-md transition-shadow"
                  >
                    <span className="mr-1 text-purple-500">{flavor.icon}</span>
                    {flavor.name}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Customer Reviews Preview */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(productData.reviews.average) ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-gray-700 font-medium">
                  {productData.reviews.average} ({productData.reviews.count} reviews)
                </span>
              </div>
              
              <blockquote className="italic text-gray-600 border-l-4 border-purple-200 pl-4 mb-3">
                "{productData.reviews.featured}"
              </blockquote>
              
              <button className="text-purple-600 font-medium hover:text-purple-800 transition-colors flex items-center">
                Read all {productData.reviews.count} reviews
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Allergen & Shelf Life Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Allergen Info</h4>
                <div className="flex flex-wrap gap-1">
                  {productData.allergens.map((allergen, index) => (
                    <span key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full capitalize">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Shelf Life</h4>
                <p className="text-sm text-gray-600">{productData.shelfLife}</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Storage</h4>
                <p className="text-sm text-gray-600">{productData.storage}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pairs Well With</h2>
          
          <div className="flex overflow-x-auto pb-4 space-x-4 hide-scrollbar">
            {productData.relatedProducts.map((relatedProduct, index) => (
              <div 
                key={index}
                className="min-w-[180px] bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="h-32 overflow-hidden">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{relatedProduct.name}</h3>
                  <p className="text-gray-700 text-sm">{relatedProduct.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom styles for the component */}
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Custom background color */
        .bg-cream-50 {
          background-color: #FFFAF0;
        }
        
        /* Font styles */
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;