import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/MainLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
    FaBreadSlice, 
    FaCookieBite, 
    FaGift, 
    FaSnowflake, 
    FaLeaf, 
    FaChild, 
    FaSearch, 
    FaArrowRight, 
    FaStar, 
    FaShoppingBag,
    FaBirthdayCake // Use this instead of FaCroissant for pastries
  } from 'react-icons/fa';
// Rainbow color theme - matches Home page


const rainbowColors = {
  red: 'bg-red-500',
  redLight: 'bg-red-400',
  redText: 'text-red-500',
  redBorder: 'border-red-500',
  redHover: 'hover:bg-red-500 hover:text-white',
  orange: 'bg-orange-500',
  orangeLight: 'bg-orange-400',
  orangeText: 'text-orange-500',
  orangeBorder: 'border-orange-500',
  orangeHover: 'hover:bg-orange-500 hover:text-white',
  yellow: 'bg-yellow-400',
  yellowLight: 'bg-yellow-300',
  yellowText: 'text-yellow-400',
  yellowBorder: 'border-yellow-400',
  yellowHover: 'hover:bg-yellow-400 hover:text-white',
  green: 'bg-green-500',
  greenLight: 'bg-green-400',
  greenText: 'text-green-500',
  greenBorder: 'border-green-500',
  greenHover: 'hover:bg-green-500 hover:text-white',
  blue: 'bg-blue-500',
  blueLight: 'bg-blue-400',
  blueText: 'text-blue-500',
  blueBorder: 'border-blue-500',
  blueHover: 'hover:bg-blue-500 hover:text-white',
  indigo: 'bg-indigo-500',
  indigoLight: 'bg-indigo-400',
  indigoText: 'text-indigo-500',
  indigoBorder: 'border-indigo-500',
  indigoHover: 'hover:bg-indigo-500 hover:text-white',
  violet: 'bg-purple-500',
  violetLight: 'bg-purple-400',
  violetText: 'text-purple-500',
  violetBorder: 'border-purple-500',
  violetHover: 'hover:bg-purple-500 hover:text-white',
};

// Collection data
const collections = [
  {
    id: 'flavored-breads',
    name: 'Flavored Breads',
    icon: <FaBreadSlice className="text-amber-700" size={32} />,
    tagline: 'From Ube Cheese Loaf to Mocha Swirls – these soft, flavored breads bring warmth to every morning.',
    bgColor: 'bg-amber-50',
    accentColor: rainbowColors.redText,
    hoverColor: rainbowColors.redHover,
    borderColor: rainbowColors.redBorder,
    image: '/api/placeholder/400/300',
    imageAlt: 'Assorted flavored breads',
    products: [
      { id: 'ube-bread', name: 'Ube Swirl Bread', price: '₱85.00', image: '/api/placeholder/220/160', story: 'Our signature purple yam infused bread - a local favorite!' },
      { id: 'cheese-loaf', name: 'Cheese Loaf', price: '₱75.00', image: '/api/placeholder/220/160', story: 'Creamy cheese in every bite of this soft bread.' },
      { id: 'cinnamon-roll', name: 'Cinnamon Roll', price: '₱45.00', image: '/api/placeholder/220/160', story: 'Warm spices swirled into a soft, pillowy dough.' },
      { id: 'banana-bread', name: 'Banana Bread', price: '₱80.00', image: '/api/placeholder/220/160', story: 'Made with ripe bananas for a moist, flavorful treat.' },
    ]
  },
  {
    id: 'pastries',
    name: 'Pastries',
    icon: <FaBirthdayCake  className="text-yellow-600" size={28} />,
    tagline: 'Golden, flaky, and melt-in-your-mouth. Discover our all-time favorites.',
    bgColor: 'bg-yellow-50',
    accentColor: rainbowColors.orangeText,
    hoverColor: rainbowColors.orangeHover,
    borderColor: rainbowColors.orangeBorder,
    image: '/api/placeholder/400/300',
    imageAlt: 'Fresh baked pastries',
    products: [
      { id: 'butter-croissant', name: 'Butter Croissant', price: '₱60.00', image: '/api/placeholder/220/160', story: 'Perfectly flaky with 27 delicate layers.' },
      { id: 'cheese-danish', name: 'Cheese Danish', price: '₱65.00', image: '/api/placeholder/220/160', story: 'Creamy cheese filling in a crisp pastry shell.' },
      { id: 'apple-turnover', name: 'Apple Turnover', price: '₱70.00', image: '/api/placeholder/220/160', story: 'Sweet apples wrapped in crisp, golden pastry.' },
      { id: 'chocolate-croissant', name: 'Chocolate Croissant', price: '₱65.00', image: '/api/placeholder/220/160', story: 'Our famous croissant filled with rich chocolate.' },
    ]
  },
  {
    id: 'hopia',
    name: 'Hopia & Heritage',
    icon: <FaCookieBite className="text-yellow-800" size={28} />,
    tagline: 'Our take on this Filipino-Chinese classic, now filled with love (and pastillas too).',
    bgColor: 'bg-amber-100',
    accentColor: rainbowColors.yellowText,
    hoverColor: rainbowColors.yellowHover,
    borderColor: rainbowColors.yellowBorder,
    image: '/api/placeholder/400/300',
    imageAlt: 'Traditional Hopia',
    products: [
      { id: 'ube-hopia', name: 'Ube Hopia', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Purple yam filling in a delicate flaky crust.' },
      { id: 'mongo-hopia', name: 'Mongo Hopia', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Classic mung bean paste wrapped in pastry.' },
      { id: 'pandan-hopia', name: 'Pandan Hopia', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Fragrant pandan-flavored filling in traditional pastry.' },
      { id: 'baboy-hopia', name: 'Hopia Baboy', price: '₱18.00', image: '/api/placeholder/220/160', story: 'Savory winter melon filling reminiscent of pork.' },
    ]
  },
  {
    id: 'pasalubong-treats',
    name: 'Pasalubong Picks',
    icon: <FaGift className="text-purple-600" size={28} />,
    tagline: 'Hand-picked gift-ready treats perfect for your loved ones.',
    bgColor: 'bg-purple-50',
    accentColor: rainbowColors.violetText,
    hoverColor: rainbowColors.violetHover,
    borderColor: rainbowColors.violetBorder,
    image: '/api/placeholder/400/300',
    imageAlt: 'Gift boxes of treats',
    products: [
      { id: 'ube-ensaymada', name: 'Ube Ensaymada Box', price: '₱280.00', image: '/api/placeholder/220/160', story: 'Box of 6 Ube Ensaymadas - perfect for sharing!' },
      { id: 'hopia-assorted', name: 'Hopia Assorted Box', price: '₱180.00', image: '/api/placeholder/220/160', story: 'Box of 12 assorted hopia flavors.' },
      { id: 'bread-basket', name: 'Bread Basket', price: '₱350.00', image: '/api/placeholder/220/160', story: 'Assortment of our bestselling breads in a basket.' },
      { id: 'polvoron-box', name: 'Polvoron Box', price: '₱150.00', image: '/api/placeholder/220/160', story: 'Delicate shortbread treats in various flavors.' },
    ]
  },
  {
    id: 'chilled-cakes',
    name: 'Chilled Cakes',
    icon: <FaSnowflake className="text-blue-500" size={28} />,
    tagline: 'Refreshing, creamy, and ready to chill your day.',
    bgColor: 'bg-blue-50',
    accentColor: rainbowColors.blueText,
    hoverColor: rainbowColors.blueHover,
    borderColor: rainbowColors.blueBorder,
    image: '/api/placeholder/400/300',
    imageAlt: 'Chilled cakes display',
    products: [
      { id: 'caramel-cake', name: 'Caramel Cake', price: '₱650.00', image: '/api/placeholder/220/160', story: 'Our bestselling caramel cake with silky smooth icing.' },
      { id: 'ube-cake', name: 'Ube Cake', price: '₱680.00', image: '/api/placeholder/220/160', story: 'Layers of ube-flavored cake with creamy frosting.' },
      { id: 'mango-cream', name: 'Mango Cream Pie', price: '₱550.00', image: '/api/placeholder/220/160', story: 'Fresh mangoes on a bed of cream in a flaky crust.' },
      { id: 'brazo-de-mercedes', name: 'Brazo de Mercedes', price: '₱450.00', image: '/api/placeholder/220/160', story: 'Light meringue roll with rich custard filling.' },
    ]
  },
  {
    id: 'healthy-corner',
    name: 'Healthy Corner',
    icon: <FaLeaf className="text-green-600" size={28} />,
    tagline: 'Wholesome ingredients, delicious results — for health-conscious foodies.',
    bgColor: 'bg-green-50',
    accentColor: rainbowColors.greenText,
    hoverColor: rainbowColors.greenHover,
    borderColor: rainbowColors.greenBorder,
    image: '/api/placeholder/400/300',
    imageAlt: 'Healthy baked goods',
    products: [
      { id: 'whole-wheat-bread', name: 'Whole Wheat Bread', price: '₱95.00', image: '/api/placeholder/220/160', story: 'Hearty whole grain bread with a touch of honey.' },
      { id: 'sugar-free-ensaymada', name: 'Sugar-Free Ensaymada', price: '₱45.00', image: '/api/placeholder/220/160', story: 'Our classic ensaymada with no added sugar.' },
      { id: 'flaxseed-loaf', name: 'Flaxseed Loaf', price: '₱110.00', image: '/api/placeholder/220/160', story: 'Nutritious bread packed with omega-3 rich flaxseeds.' },
      { id: 'multi-grain-pandesal', name: 'Multi-Grain Pandesal', price: '₱8.00', image: '/api/placeholder/220/160', story: 'A healthier take on the classic Filipino breakfast.' },
    ]
  },
  {
    id: 'peter-pann',
    name: 'Peter Pann (Kids\' Favorites)',
    icon: <FaChild className="text-pink-500" size={28} />,
    tagline: 'Made for little hands and big smiles. Treats kids will love.',
    bgColor: 'bg-pink-50',
    accentColor: rainbowColors.violetText,
    hoverColor: rainbowColors.violetHover,
    borderColor: rainbowColors.violetBorder,
    image: '/api/placeholder/400/300',
    imageAlt: 'Fun kids treats',
    products: [
      { id: 'cookie-animals', name: 'Animal Cookies', price: '₱12.00', image: '/api/placeholder/220/160', story: 'Cute animal-shaped cookies that kids love.' },
      { id: 'rainbow-bread', name: 'Rainbow Bread', price: '₱50.00', image: '/api/placeholder/220/160', story: 'Colorful swirled bread that makes mealtime fun.' },
      { id: 'star-donut', name: 'Star Donuts', price: '₱25.00', image: '/api/placeholder/220/160', story: 'Star-shaped donuts with sprinkles on top.' },
      { id: 'mini-ensaymada', name: 'Mini Ensaymada', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Bite-sized versions of our classic ensaymada.' },
    ]
  },
  {
    id: 'new-treats',
    name: '✨ Try Something New',
    icon: <FaStar className="text-yellow-500" size={28} />,
    tagline: 'Our latest creations, fresh from the oven!',
    bgColor: 'bg-gradient-to-r from-pink-50 to-amber-50',
    accentColor: 'text-amber-500',
    hoverColor: 'hover:bg-amber-500 hover:text-white',
    borderColor: 'border-amber-500',
    image: '/api/placeholder/400/300',
    imageAlt: 'New bakery products',
    products: [
      { id: 'matcha-bread', name: 'Matcha Swirl Bread', price: '₱95.00', image: '/api/placeholder/220/160', story: 'New! Japanese-inspired matcha flavored bread.' },
      { id: 'ube-cheese-pandesal', name: 'Ube Cheese Pandesal', price: '₱18.00', image: '/api/placeholder/220/160', story: 'Trending! Purple yam and cheese stuffed pandesal.' },
      { id: 'basque-cheesecake', name: 'Basque Burnt Cheesecake', price: '₱580.00', image: '/api/placeholder/220/160', story: 'Try our take on this trendy Spanish dessert!' },
      { id: 'seasonal-special', name: 'Seasonal Special', price: 'Varies', image: '/api/placeholder/220/160', story: 'Ask about our rotating seasonal special!' },
    ]
  }
];

// Collection Box component
const CollectionBox = ({ collection, isOpen, toggleCollection }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      id={collection.id}
      className={`mb-10 rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${isHovered ? 'shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collection Header */}
      <div 
        className={`${collection.bgColor} p-6 cursor-pointer`}
        onClick={() => toggleCollection(collection.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${isHovered ? collection.borderColor + ' bg-white' : 'bg-white/80'} mr-4 shadow-sm transition-all duration-300`}>
              {collection.icon}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${collection.accentColor}`}>{collection.name}</h2>
              <p className="text-gray-600 mt-1 pr-8">{collection.tagline}</p>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowRight className={`text-gray-400 ${isHovered ? collection.accentColor : ''} transition-colors duration-300`} />
          </motion.div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button className={`px-5 py-2 rounded-full border ${collection.borderColor} ${collection.accentColor} ${collection.hoverColor} transition-colors duration-300 text-sm font-medium`}>
            {isOpen ? 'Hide Products' : `See ${collection.name}`}
          </button>
          
          {/* Small product image preview */}
          {!isOpen && (
            <div className="flex -space-x-3">
              {collection.products.slice(0, 3).map((product, index) => (
                <div 
                  key={product.id} 
                  className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm"
                  style={{ zIndex: 3 - index }}
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              ))}
              {collection.products.length > 3 && (
                <div className="w-12 h-12 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm text-xs font-medium text-gray-500">
                  +{collection.products.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Products Grid (Expandable) */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden bg-white"
      >
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collection.products.map((product) => (
            <motion.div 
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-900 font-medium mt-1">{product.price}</p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.story}</p>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`${i < 4 ? 'text-yellow-400' : 'text-gray-300'} text-xs`} 
                      />
                    ))}
                  </div>
                  <button className={`text-sm ${collection.bgColor} ${collection.accentColor} hover:bg-gray-100 py-1 px-3 rounded-full transition-colors`}>
                    <FaShoppingBag className="inline-block mr-1 text-xs" /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function Menu() {
  const [openCollections, setOpenCollections] = useState([]);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const headerRef = useRef(null);
  
  // Handle collection toggle
  const toggleCollection = (id) => {
    if (openCollections.includes(id)) {
      setOpenCollections(openCollections.filter(collectionId => collectionId !== id));
    } else {
      setOpenCollections([...openCollections, id]);
    }
  };
  const footerProps = {
    title: "Found Something You Like?",
    description: "Browse our complete menu and place your order today.",
    primaryButtonText: "Place Order",
    secondaryButtonText: "Contact Us",
    secondaryButtonUrl: "/contact"
};
  // Handle scroll for showing filter bar
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom;
        setShowFilterBar(headerBottom < 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to collection
  const scrollToCollection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Adjust for header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Open the collection if it's not already open
      if (!openCollections.includes(id)) {
        toggleCollection(id);
      }
    }
  };

  return (
    <AppLayout footerProps={footerProps}>
      <Head title="Menu - BW SUPERBAKESHOP" />
      
      {/* Sticky Filter Bar */}
      <div className={`fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md shadow-md transform transition-transform duration-300 ${showFilterBar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1 overflow-x-auto hide-scrollbar">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => scrollToCollection(collection.id)}
                  className={`px-3 py-1 text-sm whitespace-nowrap rounded-full transition-colors ${openCollections.includes(collection.id) ? collection.accentColor + ' ' + collection.bgColor : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {collection.icon && <span className="mr-1">{React.cloneElement(collection.icon, { size: 14 })}</span>}
                  {collection.name.replace(' (Kids\' Favorites)', '').replace('✨ ', '')}
                </button>
              ))}
            </div>
            
            <div className="relative ml-2">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-8 pr-4 py-1 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Header */}
      <div className="relative overflow-hidden" ref={headerRef}>
        <img 
          src="/api/placeholder/1600/600" 
          alt="Bakery treats" 
          className="w-full h-96 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white text-xl max-w-2xl mb-8"
          >
            Browse our freshly baked collections — made with love from our kitchen to yours.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="bg-white text-amber-600 hover:bg-amber-600 hover:text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium">
              View All Products
            </button>
            <button className="bg-transparent text-white border border-white hover:bg-white hover:text-amber-600 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium">
              Create a Pasalubong Box
            </button>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-red-500 opacity-20 mix-blend-multiply blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-yellow-500 opacity-20 mix-blend-multiply blur-xl"></div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Collections */}
        {collections.map((collection) => (
          <CollectionBox 
            key={collection.id} 
            collection={collection}
            isOpen={openCollections.includes(collection.id)}
            toggleCollection={toggleCollection}
          />
        ))}
        
       
      </div>
    </AppLayout>
  );
}