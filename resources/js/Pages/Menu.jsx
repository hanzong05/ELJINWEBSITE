
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaStar, FaShoppingBag, FaTimes } from 'react-icons/fa';

// Rainbow color theme - matches Home page
const rainbowColors = {
  red: 'bg-red-500',
  redLight: 'bg-red-400',
  redText: 'text-red-500',
  redBorder: 'border-red-500',
  orange: 'bg-orange-500',
  orangeLight: 'bg-orange-400',
  orangeText: 'text-orange-500',
  orangeBorder: 'border-orange-500',
  yellow: 'bg-yellow-400',
  yellowLight: 'bg-yellow-300',
  yellowText: 'text-yellow-400',
  yellowBorder: 'border-yellow-400',
  green: 'bg-green-500',
  greenLight: 'bg-green-400',
  greenText: 'text-green-500',
  greenBorder: 'border-green-500',
  blue: 'bg-blue-500',
  blueLight: 'bg-blue-400',
  blueText: 'text-blue-500',
  blueBorder: 'border-blue-500',
  indigo: 'bg-indigo-500',
  indigoLight: 'bg-indigo-400',
  indigoText: 'text-indigo-500',
  indigoBorder: 'border-indigo-500',
  violet: 'bg-purple-500',
  violetLight: 'bg-purple-400',
  violetText: 'text-purple-500',
  violetBorder: 'border-purple-500',
};

// Rainbow gradients
const rainbowGradients = {
  full: 'bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-500',
  redToOrange: 'bg-gradient-to-r from-red-500 to-orange-500',
  orangeToYellow: 'bg-gradient-to-r from-orange-500 to-yellow-400',
  yellowToGreen: 'bg-gradient-to-r from-yellow-400 to-green-500',
  greenToBlue: 'bg-gradient-to-r from-green-500 to-blue-500',
  blueToIndigo: 'bg-gradient-to-r from-blue-500 to-indigo-500',
  indigoToViolet: 'bg-gradient-to-r from-indigo-500 to-purple-500',
  textFull: 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-500',
};

// Wood textures for shelves
const woodTextures = {
  light: 'bg-amber-100',
  medium: 'bg-amber-200',
  dark: 'bg-amber-300',
  grain: 'bg-[url("/api/placeholder/100/100")] bg-repeat',
};

// Product category shelves data
const productShelves = [
  {
    id: 'flavored-breads',
    name: 'Flavored Breads',
    tagline: 'Loaves with stories baked into every swirl.',
    background: woodTextures.light,
    gradient: rainbowGradients.redToOrange,
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500',
    color: rainbowColors.red,
    products: [
      { id: 'ube-bread', name: 'Ube Swirl Bread', price: '₱85.00', image: '/api/placeholder/220/160', story: 'Our signature purple yam infused bread - a local favorite!' },
      { id: 'cheese-loaf', name: 'Cheese Loaf', price: '₱75.00', image: '/api/placeholder/220/160', story: 'Creamy cheese in every bite of this soft bread.' },
      { id: 'cinnamon-roll', name: 'Cinnamon Roll', price: '₱45.00', image: '/api/placeholder/220/160', story: 'Warm spices swirled into a soft, pillowy dough.' },
      { id: 'banana-bread', name: 'Banana Bread', price: '₱80.00', image: '/api/placeholder/220/160', story: 'Made with ripe bananas for a moist, flavorful treat.' },
      { id: 'pandan-loaf', name: 'Pandan Loaf', price: '₱85.00', image: '/api/placeholder/220/160', story: 'Aromatic pandan leaves give this bread its distinctive flavor.' },
      { id: 'chocolate-bread', name: 'Chocolate Marble', price: '₱90.00', image: '/api/placeholder/220/160', story: 'Swirls of chocolate dance through every slice.' }
    ]
  },
  {
    id: 'pastries',
    name: 'Pastries',
    tagline: 'Layers of buttery joy in every flaky fold.',
    background: woodTextures.medium,
    gradient: rainbowGradients.orangeToYellow,
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400',
    color: rainbowColors.orange,
    products: [
      { id: 'butter-croissant', name: 'Butter Croissant', price: '₱60.00', image: '/api/placeholder/220/160', story: 'Perfectly flaky with 27 delicate layers.' },
      { id: 'cheese-danish', name: 'Cheese Danish', price: '₱65.00', image: '/api/placeholder/220/160', story: 'Creamy cheese filling in a crisp pastry shell.' },
      { id: 'apple-turnover', name: 'Apple Turnover', price: '₱70.00', image: '/api/placeholder/220/160', story: 'Sweet apples wrapped in crisp, golden pastry.' },
      { id: 'chocolate-croissant', name: 'Chocolate Croissant', price: '₱65.00', image: '/api/placeholder/220/160', story: 'Our famous croissant filled with rich chocolate.' },
      { id: 'fruit-danish', name: 'Fruit Danish', price: '₱75.00', image: '/api/placeholder/220/160', story: 'Seasonal fruits atop our flaky danish pastry.' },
      { id: 'egg-tart', name: 'Egg Tart', price: '₱55.00', image: '/api/placeholder/220/160', story: 'Silky smooth custard in a crisp shell.' }
    ]
  },
  {
    id: 'hopia',
    name: 'Hopia',
    tagline: 'Traditional treats with sweet surprises inside.',
    background: woodTextures.dark,
    gradient: rainbowGradients.yellowToGreen,
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500',
    color: rainbowColors.yellow,
    products: [
      { id: 'ube-hopia', name: 'Ube Hopia', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Purple yam filling in a delicate flaky crust.' },
      { id: 'mongo-hopia', name: 'Mongo Hopia', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Classic mung bean paste wrapped in pastry.' },
      { id: 'pandan-hopia', name: 'Pandan Hopia', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Fragrant pandan-flavored filling in traditional pastry.' },
      { id: 'baboy-hopia', name: 'Hopia Baboy', price: '₱18.00', image: '/api/placeholder/220/160', story: 'Savory winter melon filling reminiscent of pork.' },
      { id: 'langka-hopia', name: 'Langka Hopia', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Sweet jackfruit filling in our signature pastry.' },
      { id: 'custard-hopia', name: 'Custard Hopia', price: '₱18.00', image: '/api/placeholder/220/160', story: 'Creamy custard center in a traditional shell.' }
    ]
  },
  {
    id: 'classic-panaderya',
    name: 'Classic Panaderya',
    tagline: 'Panlasang Pinoy classics, freshly baked every morning.',
    background: woodTextures.light,
    gradient: rainbowGradients.greenToBlue,
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500',
    color: rainbowColors.green,
    products: [
      { id: 'pandesal', name: 'Pandesal', price: '₱5.00', image: '/api/placeholder/220/160', story: 'The quintessential Filipino breakfast bread.' },
      { id: 'ensaymada', name: 'Ensaymada', price: '₱35.00', image: '/api/placeholder/220/160', story: 'Soft, buttery bread topped with cheese and sugar.' },
      { id: 'pan-de-coco', name: 'Pan de Coco', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Sweet coconut filling in a soft bread roll.' },
      { id: 'monay', name: 'Monay', price: '₱12.00', image: '/api/placeholder/220/160', story: 'Dense, slightly sweet bread with a unique shape.' },
      { id: 'spanish-bread', name: 'Spanish Bread', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Rolled bread with a sweet buttery filling.' },
      { id: 'putok', name: 'Putok (Star Bread)', price: '₱12.00', image: '/api/placeholder/220/160', story: 'Star-shaped bread with a slightly sweet flavor.' }
    ]
  },
  {
    id: 'pasalubong-treats',
    name: 'Pasalubong Treats',
    tagline: 'Gifts that taste like home.',
    background: woodTextures.medium,
    gradient: rainbowGradients.blueToIndigo,
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500',
    color: rainbowColors.blue,
    products: [
      { id: 'ube-ensaymada', name: 'Ube Ensaymada Box', price: '₱280.00', image: '/api/placeholder/220/160', story: 'Box of 6 Ube Ensaymadas - perfect for sharing!' },
      { id: 'hopia-assorted', name: 'Hopia Assorted Box', price: '₱180.00', image: '/api/placeholder/220/160', story: 'Box of 12 assorted hopia flavors.' },
      { id: 'bread-basket', name: 'Bread Basket', price: '₱350.00', image: '/api/placeholder/220/160', story: 'Assortment of our bestselling breads in a basket.' },
      { id: 'polvoron-box', name: 'Polvoron Box', price: '₱150.00', image: '/api/placeholder/220/160', story: 'Delicate shortbread treats in various flavors.' },
      { id: 'pastillas-box', name: 'Pastillas Box', price: '₱120.00', image: '/api/placeholder/220/160', story: 'Milk candies wrapped in decorative paper.' },
      { id: 'food-for-the-gods', name: 'Food for the Gods', price: '₱200.00', image: '/api/placeholder/220/160', story: 'Rich date and walnut bars - perfect for gifting.' }
    ]
  },
  {
    id: 'chilled-cakes',
    name: 'Chilled Cakes',
    tagline: 'Cool cakes for sunny days and sweet escapes.',
    background: woodTextures.dark,
    gradient: rainbowGradients.indigoToViolet,
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500',
    color: rainbowColors.indigo,
    products: [
      { id: 'caramel-cake', name: 'Caramel Cake', price: '₱650.00', image: '/api/placeholder/220/160', story: 'Our bestselling caramel cake with silky smooth icing.' },
      { id: 'ube-cake', name: 'Ube Cake', price: '₱680.00', image: '/api/placeholder/220/160', story: 'Layers of ube-flavored cake with creamy frosting.' },
      { id: 'mango-cream', name: 'Mango Cream Pie', price: '₱550.00', image: '/api/placeholder/220/160', story: 'Fresh mangoes on a bed of cream in a flaky crust.' },
      { id: 'brazo-de-mercedes', name: 'Brazo de Mercedes', price: '₱450.00', image: '/api/placeholder/220/160', story: 'Light meringue roll with rich custard filling.' },
      { id: 'sans-rival', name: 'Sans Rival', price: '₱580.00', image: '/api/placeholder/220/160', story: 'Layers of buttercream, meringue and cashews.' },
      { id: 'crema-de-fruta', name: 'Crema de Fruta', price: '₱620.00', image: '/api/placeholder/220/160', story: 'Sponge cake with custard and fresh fruits.' }
    ]
  },
  {
    id: 'healthy-corner',
    name: 'Healthy Corner',
    tagline: 'Wholesome choices, full of flavor and fiber.',
    background: woodTextures.light,
    gradient: rainbowGradients.redToOrange,
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600',
    color: rainbowColors.green,
    products: [
      { id: 'whole-wheat-bread', name: 'Whole Wheat Bread', price: '₱95.00', image: '/api/placeholder/220/160', story: 'Hearty whole grain bread with a touch of honey.' },
      { id: 'sugar-free-ensaymada', name: 'Sugar-Free Ensaymada', price: '₱45.00', image: '/api/placeholder/220/160', story: 'Our classic ensaymada with no added sugar.' },
      { id: 'flaxseed-loaf', name: 'Flaxseed Loaf', price: '₱110.00', image: '/api/placeholder/220/160', story: 'Nutritious bread packed with omega-3 rich flaxseeds.' },
      { id: 'multi-grain-pandesal', name: 'Multi-Grain Pandesal', price: '₱8.00', image: '/api/placeholder/220/160', story: 'A healthier take on the classic Filipino breakfast.' },
      { id: 'oat-cookies', name: 'Oat Cookies', price: '₱18.00', image: '/api/placeholder/220/160', story: 'Chewy oatmeal cookies with less sugar.' },
      { id: 'gluten-free-muffins', name: 'Gluten-Free Muffins', price: '₱55.00', image: '/api/placeholder/220/160', story: 'Delicious banana muffins made without gluten.' }
    ]
  },
  {
    id: 'peter-pann',
    name: 'Peter Pann',
    tagline: 'Tiny treats for big imaginations.',
    background: woodTextures.medium,
    gradient: rainbowGradients.orangeToYellow,
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500',
    color: rainbowColors.violet,
    products: [
      { id: 'cookie-animals', name: 'Animal Cookies', price: '₱12.00', image: '/api/placeholder/220/160', story: 'Cute animal-shaped cookies that kids love.' },
      { id: 'rainbow-bread', name: 'Rainbow Bread', price: '₱50.00', image: '/api/placeholder/220/160', story: 'Colorful swirled bread that makes mealtime fun.' },
      { id: 'star-donut', name: 'Star Donuts', price: '₱25.00', image: '/api/placeholder/220/160', story: 'Star-shaped donuts with sprinkles on top.' },
      { id: 'chocolate-lollipop', name: 'Chocolate Lollipops', price: '₱35.00', image: '/api/placeholder/220/160', story: 'Chocolate treats on a stick in fun shapes.' },
      { id: 'character-cupcakes', name: 'Character Cupcakes', price: '₱40.00', image: '/api/placeholder/220/160', story: 'Cupcakes decorated as popular characters.' },
      { id: 'mini-ensaymada', name: 'Mini Ensaymada', price: '₱15.00', image: '/api/placeholder/220/160', story: 'Bite-sized versions of our classic ensaymada.' }
    ]
  },
  {
    id: 'new-treats',
    name: '✨ Try Something New',
    tagline: 'Our latest creations, fresh from the oven!',
    background: woodTextures.dark,
    gradient: rainbowGradients.full,
    textGradient: rainbowGradients.textFull,
    color: rainbowColors.yellow,
    products: [
      { id: 'matcha-bread', name: 'Matcha Swirl Bread', price: '₱95.00', image: '/api/placeholder/220/160', story: 'New! Japanese-inspired matcha flavored bread.' },
      { id: 'ube-cheese-pandesal', name: 'Ube Cheese Pandesal', price: '₱18.00', image: '/api/placeholder/220/160', story: 'Trending! Purple yam and cheese stuffed pandesal.' },
      { id: 'basque-cheesecake', name: 'Basque Burnt Cheesecake', price: '₱580.00', image: '/api/placeholder/220/160', story: 'Try our take on this trendy Spanish dessert!' },
      { id: 'seasonal-special', name: 'Seasonal Special', price: 'Varies', image: '/api/placeholder/220/160', story: 'Ask about our rotating seasonal special!' }
    ]
  }
];



const ProductShelf = ({ shelf, index }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Realistic wood texture generation
  const generateWoodTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    // Base wood color
    const baseColors = [
      { dark: '#8B4513', light: '#D2691E', mid: '#A0522D' },   // Mahogany
      { dark: '#964B00', light: '#C19A6B', mid: '#7F5A32' },   // Walnut
      { dark: '#5D4037', light: '#A1887F', mid: '#6D4C41' }    // Rich Brown
    ];
    
    const woodStyle = baseColors[index % baseColors.length];
    
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, woodStyle.dark);
    gradient.addColorStop(0.5, woodStyle.mid);
    gradient.addColorStop(1, woodStyle.light);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Wood grain effect
    for (let y = 0; y < canvas.height; y += 2) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
      ctx.lineWidth = Math.random() * 1.5;
      
      let x = 0;
      while (x < canvas.width) {
        const curveWidth = Math.random() * 50 + 10;
        const amplitude = Math.random() * 5;
        
        ctx.quadraticCurveTo(
          x + curveWidth / 2, 
          y + Math.sin(x / 20) * amplitude, 
          x + curveWidth, 
          y
        );
        
        x += curveWidth;
      }
      
      ctx.stroke();
    }
    
    // Add some noise for texture
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        if (Math.random() < 0.05) {
          ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    
    return canvas.toDataURL();
  };

  // Memoize wood texture to prevent regeneration on every render
  const woodTexture = useMemo(generateWoodTexture, [index]);
  
  return (
    <div className="mb-20 relative group" id={shelf.id}>
      {/* Category Title and Badge */}
      <div className="flex items-center mb-5">
        <div className={`${shelf.gradient} py-2 px-4 rounded-full shadow-md inline-flex items-center`}>
          <span className="text-white font-bold text-lg">{shelf.name}</span>
        </div>
        <div className="ml-4">
          <h3 className={`text-lg ${shelf.textGradient} font-medium italic`}>{shelf.tagline}</h3>
        </div>
      </div>
      
      {/* Scroll Navigation Arrows */}
      {showLeftArrow && (
        <button 
          onClick={scrollLeft} 
          className="absolute left-0 top-1/2 z-10 -translate-y-8 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white"
          aria-label="Scroll left"
        >
          <FaArrowLeft className="text-gray-800" />
        </button>
      )}
      
      {showRightArrow && (
        <button 
          onClick={scrollRight} 
          className="absolute right-0 top-1/2 z-10 -translate-y-8 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white"
          aria-label="Scroll right"
        >
          <FaArrowRight className="text-gray-800" />
        </button>
      )}
      
      {/* Realistic Shelf Container */}
      <div className="relative perspective-1000 group">
        {/* Shelf Support Shadows */}
        <div className="absolute -top-4 left-0 right-0 h-8 bg-gradient-to-b from-gray-300/20 to-transparent"></div>
        
        {/* Scrollable product container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto pb-8 pt-2 hide-scrollbar snap-x relative z-10"
          style={{ scrollbarWidth: 'none' }}
        >
          {shelf.products.map((product) => (
            <motion.div 
              key={product.id}
              className="snap-start flex-shrink-0 mr-6 w-56 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="relative overflow-hidden h-44">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white/90 hover:bg-white backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-800 transition-all duration-300 transform scale-90 hover:scale-100">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <div className="flex justify-between items-center mt-1 mb-2">
                  <span className="font-medium text-gray-900">{product.price}</span>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 text-xs" />
                    <FaStar className="text-yellow-400 text-xs" />
                    <FaStar className="text-yellow-400 text-xs" />
                    <FaStar className="text-yellow-400 text-xs" />
                    <FaStar className={`text-xs ${Math.random() > 0.5 ? 'text-yellow-400' : 'text-gray-300'}`} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{product.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Ultra-Realistic Wooden Shelf */}
        <div 
          className="relative z-0 rounded-b-xl overflow-hidden shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)]"
          style={{
            backgroundImage: `url(${woodTexture})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Shelf Height and Depth */}
          <div className="h-12 relative">
            {/* Light Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 mix-blend-overlay"></div>
            
            {/* Shelf Brackets */}
            <div className="absolute bottom-0 left-1/4 w-10 h-4 bg-black/10 transform -skew-x-12 origin-bottom-right"></div>
            <div className="absolute bottom-0 right-1/4 w-10 h-4 bg-black/10 transform skew-x-12 origin-bottom-left"></div>
          </div>
          
          {/* Wood Grain Highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 mix-blend-color-dodge opacity-50"></div>
        </div>
        
        {/* Subtle Shadow Under Shelf */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default function Menu() {
  return (
    <AppLayout>
      <Head title="Menu - BW SUPERBAKESHOP" />
      
      {/* Hero Banner */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="/api/placeholder/1600/800" 
          alt="Bakery Products" 
          className="w-full h-full object-cover object-center"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`text-5xl font-bold text-white mb-4`}
          >
            Our <span className={rainbowGradients.textFull}>Menu</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white text-xl max-w-2xl"
          >
            Browse our shelves and discover a world of freshly baked goodness, where tradition meets innovation in every bite.
          </motion.p>
        </div>
      </div>
      
      {/* Quick Navigation */}
      <div className="bg-white shadow-md sticky top-0 z-30 py-3 px-4 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-4 max-w-6xl mx-auto">
          {productShelves.map((shelf) => (
            <a 
              key={shelf.id} 
              href={`#${shelf.id}`}
              className={`px-3 py-1 rounded-full whitespace-nowrap text-sm font-medium transition-colors hover:text-white ${shelf.textGradient} hover:${shelf.color}`}
            >
              {shelf.name}
            </a>
          ))}
        </div>
      </div>
      
      {/* Main Content - Shelves */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Floating decorative elements */}
        <motion.div 
          className={`fixed top-1/4 left-16 h-16 w-16 rounded-full ${rainbowColors.redLight} opacity-20 z-5 backdrop-blur-sm`}
          animate={{ 
            y: [0, -20, 0], 
            x: [0, 10, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className={`fixed bottom-1/3 right-16 h-12 w-12 rounded-full ${rainbowColors.yellowLight} opacity-20 z-5 backdrop-blur-sm`}
          animate={{ 
            y: [0, 20, 0], 
            x: [0, -15, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut",
            delay: 1 
          }}
        />
        
        <motion.div 
          className={`fixed top-2/3 right-1/4 h-10 w-10 rounded-full ${rainbowColors.blueLight} opacity-20 z-5 backdrop-blur-sm`}
          animate={{ 
            y: [0, 15, 0], 
            x: [0, 10, 0],
            scale: [1, 1.15, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 9,
            ease: "easeInOut",
            delay: 2 
          }}
        />
        
        <motion.div 
          className={`fixed top-1/2 left-1/3 h-8 w-8 rounded-full ${rainbowColors.violetLight} opacity-20 z-5 backdrop-blur-sm`}
          animate={{ 
            y: [0, -10, 0], 
            x: [0, -5, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7,
            ease: "easeInOut",
            delay: 3 
          }}
        />
        
        {/* Product Shelves */}
        {productShelves.map((shelf, index) => (
          <ProductShelf key={shelf.id} shelf={shelf} index={index} />
        ))}
        
        {/* Bottom CTA */}
       
      </div>
    </AppLayout>
  );
}