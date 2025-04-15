import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer'; // Import the Footer component

// Rainbow color theme - vibrant and playful
const rainbowColors = {
  red: 'bg-red-500',
  redText: 'text-red-500',
  redBorder: 'border-red-500',
  redHover: 'hover:bg-red-600',
  orange: 'bg-orange-500',
  orangeText: 'text-orange-500',
  orangeBorder: 'border-orange-500',
  orangeHover: 'hover:bg-orange-600',
  yellow: 'bg-yellow-400',
  yellowText: 'text-yellow-400',
  yellowBorder: 'border-yellow-400',
  yellowHover: 'hover:bg-yellow-500',
  green: 'bg-green-500',
  greenText: 'text-green-500',
  greenBorder: 'border-green-500',
  greenHover: 'hover:bg-green-600',
  blue: 'bg-blue-500',
  blueText: 'text-blue-500',
  blueBorder: 'border-blue-500',
  blueHover: 'hover:bg-blue-600',
  indigo: 'bg-indigo-500',
  indigoText: 'text-indigo-500',
  indigoBorder: 'border-indigo-500',
  indigoHover: 'hover:bg-indigo-600',
  violet: 'bg-purple-500',
  violetText: 'text-purple-500',
  violetBorder: 'border-purple-500',
  violetHover: 'hover:bg-purple-600',
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

// Mood-based recommendations
const moodRecommendations = {
  indulgent: {
    title: "Heavenly Caramel Cake",
    description: "Rich, buttery, and sinfully delicious. Perfect for those moments when only the most indulgent treat will do.",
    image: "/api/placeholder/500/300",
    color: rainbowColors.red,
    textColor: rainbowColors.redText
  },
  light: {
    title: "Fruit Tart",
    description: "Fresh, vibrant, and delicately sweet. A perfect balance of flavors that won't weigh you down.",
    image: "/api/placeholder/500/300",
    color: rainbowColors.green,
    textColor: rainbowColors.greenText
  },
  celebrating: {
    title: "Custom Celebration Cake",
    description: "Make your special moments unforgettable with our handcrafted celebration cakes, designed just for you.",
    image: "/api/placeholder/500/300",
    color: rainbowColors.blue,
    textColor: rainbowColors.blueText
  }
};

// Bakery history timeline
const bakeryTimeline = [
  { year: 1993, title: "Our First Hopia Pastillias", description: "Our very first batch of Hopia Pastillias was born, changing the way Tarlac tasted traditional pastries.", color: rainbowColors.red },
  { year: 2001, title: "Ube Revolution", description: "We introduced our signature Ube Ensaymada, blending Filipino heritage with our passion for innovative baking.", color: rainbowColors.orange },
  { year: 2008, title: "The Golden Era", description: "Our Caramel Loaf received national recognition, becoming a household name across the region.", color: rainbowColors.yellow },
  { year: 2015, title: "Global Recognition", description: "Our pastries were featured in international food magazines, bringing Filipino baking to the world stage.", color: rainbowColors.blue },
  { year: 2023, title: "Innovation Continues", description: "We launched our artisanal bread line, combining traditional methods with contemporary flavors.", color: rainbowColors.violet }
];

// Daily mood recommendations based on weather
const dailyMoods = [
  { condition: "Sunny", recommendation: "Golden Caramel Loaf for a sunlit afternoon.", color: rainbowColors.yellow },
  { condition: "Rainy", recommendation: "Warm, melt-in-your-mouth Ube Ensaymada with your favorite coffee.", color: rainbowColors.blue },
  { condition: "Cloudy", recommendation: "Our buttery Cheese Rolls to brighten up a gray day.", color: rainbowColors.indigo },
  { condition: "Hot", recommendation: "Refreshing Mango Cream Pie to cool down your senses.", color: rainbowColors.orange },
  { condition: "Chilly", recommendation: "A comforting slice of Chocolate Banana Bread, fresh from our oven.", color: rainbowColors.red }
];

// Featured stories
const featuredStories = [
  {
    title: "Behind the Scenes: Morning Rituals",
    excerpt: "Our bakers start at 4 AM, preparing the freshest treats for your day...",
    image: "/api/placeholder/400/200",
    color: rainbowGradients.redToOrange,
    route: '/blog/morning-rituals'
  },
  {
    title: "Local Ingredients, Global Tastes",
    excerpt: "How we source the finest local ingredients to create world-class flavors...",
    image: "/api/placeholder/400/200",
    color: rainbowGradients.greenToBlue,
    route: '/blog/local-ingredients'
  },
  {
    title: "The Art of Perfect Ensaymada",
    excerpt: "The secrets behind our fluffy, melt-in-your-mouth Ensaymada technique...",
    image: "/api/placeholder/400/200",
    color: rainbowGradients.indigoToViolet,
    route: '/blog/perfect-ensaymada'
  }
];

// Signature desserts
const signatureDesserts = [
  {
    name: "Ube Ensaymada",
    description: "Soft, fluffy, and just the right amount of sweetness – each bite tells a story of Filipino heritage and modern love for baking.",
    image: "/api/placeholder/400/300",
    color: rainbowColors.violet,
    textColor: rainbowColors.violetText,
    route: '/products/ube-ensaymada'
  },
  {
    name: "Heavenly Caramel Cake",
    description: "A perfect harmony of light sponge cake and rich caramel topping, creating a dessert experience that lingers in your memory.",
    image: "/api/placeholder/400/300",
    color: rainbowColors.orange,
    textColor: rainbowColors.orangeText,
    route: '/products/caramel-cake'
  },
  {
    name: "Artisanal Hopia",
    description: "Traditional Filipino pastry reinvented with premium fillings, showcasing our commitment to honoring culinary heritage.",
    image: "/api/placeholder/400/300",
    color: rainbowColors.blue,
    textColor: rainbowColors.blueText,
    route: '/products/artisanal-hopia'
  }
];

export default function Home() {
  // State for the current selected mood recommendation
  const [selectedMood, setSelectedMood] = useState(null);
  
  // State for the current selected timeline item
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(bakeryTimeline[bakeryTimeline.length - 1]);
  
  // State for navigating to different sections
  const handleNavigateToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle mood selection
  const handleMoodSelect = (mood) => {
    setSelectedMood(moodRecommendations[mood]);
  };

  // Handle timeline item selection
  const handleTimelineSelect = (item) => {
    setSelectedTimelineItem(item);
  };

  return (
    <>
      {/* Fixed Video Background that spans entire viewport */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/storage/Assets/BG_VIDEO.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay with subtle rainbow gradient */}
        <div className={`absolute inset-0 ${rainbowGradients.full} opacity-20 mix-blend-overlay`}></div>
      </div>
      
      {/* Floating elements with rainbow colors - now positioned fixed to appear over the entire page */}
      <motion.div 
        className={`fixed top-1/4 left-1/4 h-20 w-20 rounded-full ${rainbowColors.red} opacity-40 z-5 backdrop-blur-sm`}
        animate={{ 
          y: [0, -20, 0], 
          x: [0, 10, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 5,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className={`fixed bottom-1/3 right-1/4 h-16 w-16 rounded-full ${rainbowColors.yellow} opacity-40 z-5 backdrop-blur-sm`}
        animate={{ 
          y: [0, 20, 0], 
          x: [0, -15, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 6,
          ease: "easeInOut",
          delay: 1 
        }}
      />
      
      <motion.div 
        className={`fixed top-1/2 right-1/3 h-12 w-12 rounded-full ${rainbowColors.blue} opacity-40 z-5 backdrop-blur-sm`}
        animate={{ 
          y: [0, 15, 0], 
          x: [0, 20, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 7,
          ease: "easeInOut",
          delay: 2 
        }}
      />
      
      <motion.div 
        className={`fixed bottom-1/4 left-1/3 h-14 w-14 rounded-full ${rainbowColors.green} opacity-40 z-5 backdrop-blur-sm`}
        animate={{ 
          y: [0, -15, 0], 
          x: [0, -10, 0],
          scale: [1, 1.15, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "easeInOut",
          delay: 3 
        }}
      />
      
      <motion.div 
        className={`fixed top-1/3 right-1/4 h-10 w-10 rounded-full ${rainbowColors.violet} opacity-40 z-5 backdrop-blur-sm`}
        animate={{ 
          y: [0, 10, 0], 
          x: [0, 15, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 6.5,
          ease: "easeInOut",
          delay: 1.5 
        }}
      />
      
      {/* Main content starts here, all with higher z-index */}
      <AppLayout>
        <Head title="Home" />
        
        <div className="relative z-10"> {/* This wrapper ensures all content is above the video */}
          {/* Immersive Intro */}
          <section id="intro" className="min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl text-white drop-shadow-lg">
                  We don't just bake. <br />
                  <span className={rainbowGradients.textFull}>We create moments.</span>
                </h1>
                
                <p className="mb-8 text-xl text-white md:text-2xl drop-shadow-md">
                  From our kitchen to your table, every pastry tells a story.
                </p>
                
                <button 
                  onClick={() => handleNavigateToSection('signature-desserts')}
                  className={`rounded-full ${rainbowColors.blue} px-8 py-3 text-lg font-semibold text-white transition-all ${rainbowColors.blueHover} hover:shadow-lg`}
                >
                  See Our Creations
                </button>
              </motion.div>
            </div>
          </section>
          
          {/* Daily Mood */}
          <section id="daily-mood" className="py-12 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-xl font-medium text-white mb-2">Bakery Mood of the Day</h3>
              <p className="text-3xl font-bold text-white mb-4">{dailyMoods[Math.floor(Math.random() * dailyMoods.length)].condition} Day Recommendation</p>
              <div className="bg-white/90 rounded-lg py-4 px-6 max-w-lg mx-auto shadow-lg">
                <p className="text-lg font-medium text-gray-700">{dailyMoods[Math.floor(Math.random() * dailyMoods.length)].recommendation}</p>
              </div>
            </div>
          </section>
          
          {/* Signature Desserts */}
          <section id="signature-desserts" className="py-20 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4">
              <h2 className="mb-16 text-center text-4xl font-bold">
                Our Signature <span className={rainbowGradients.textFull}>Creations</span>
              </h2>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="w-full md:w-1/2 lg:w-2/5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={signatureDesserts[0].name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className={`aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg border-4 ${signatureDesserts[0].color === rainbowColors.violet ? rainbowColors.violetBorder : signatureDesserts[0].color === rainbowColors.orange ? rainbowColors.orangeBorder : rainbowColors.blueBorder}`}
                    >
                      <Link href={signatureDesserts[0].route}>
                        <img 
                          src={signatureDesserts[0].image} 
                          alt={signatureDesserts[0].name}
                          className="h-full w-full object-cover transform transition duration-700 hover:scale-110"
                        />
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div className="w-full md:w-1/2 lg:w-2/5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={signatureDesserts[0].name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className={`mb-4 text-3xl font-bold ${signatureDesserts[0].textColor}`}>
                        {signatureDesserts[0].name}
                      </h3>
                      <p className="mb-8 text-lg text-gray-800">
                        {signatureDesserts[0].description}
                      </p>
                      <Link
                        href={signatureDesserts[0].route}
                        className={`inline-block px-6 py-2 rounded-lg ${rainbowColors.violet} text-white font-medium transition-all hover:shadow-lg`}
                      >
                        View Details
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>
          
          {/* Personalization Feature */}
          <section id="mood-recommendations" className="py-20 bg-gray-900/70 backdrop-blur-md text-white">
            <div className="container mx-auto px-4">
              <h2 className="mb-6 text-center text-4xl font-bold">
                <span className={rainbowGradients.textFull}>Bake Your Day</span>
              </h2>
              <p className="mb-12 text-center text-lg text-white max-w-2xl mx-auto">
                How are you feeling today? Select your mood, and we'll recommend the perfect treat to match.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                {Object.entries(moodRecommendations).map(([mood, item]) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelect(mood)}
                    className={`py-4 px-6 rounded-lg text-lg font-medium transition-all ${item.color} text-white shadow-lg hover:opacity-90 active:scale-95`}
                  >
                    {mood === "indulgent" && "Feeling Indulgent"}
                    {mood === "light" && "Need Something Light"}
                    {mood === "celebrating" && "Celebrating a Moment"}
                  </button>
                ))}
              </div>
              
              {/* Display selected mood recommendation */}
              {selectedMood && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto mt-8 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
                >
                  <h3 className="text-2xl font-bold mb-3">{selectedMood.title}</h3>
                  <p className="text-white/90 mb-4">{selectedMood.description}</p>
                  <Link
                    href={`/products/${selectedMood.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`inline-block px-6 py-2 rounded-lg ${selectedMood.color} text-white font-medium transition-all hover:shadow-lg`}
                  >
                    Order Now
                  </Link>
                </motion.div>
              )}
            </div>
          </section>
          
          {/* Bakery Timeline */}
          <section id="timeline" className="py-20 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4">
              <h2 className="mb-16 text-center text-4xl font-bold">
                Our Bakes <span className={rainbowGradients.textFull}>Through the Years</span>
              </h2>
              
              <div className="relative">
                {/* Timeline line */}
                <div className={`absolute left-0 right-0 top-1/2 h-1 ${rainbowGradients.full} transform -translate-y-1/2`}></div>
                
                {/* Timeline points */}
                <div className="relative flex justify-between mb-16">
                  {bakeryTimeline.map(item => (
                    <button
                      key={item.year}
                      onClick={() => handleTimelineSelect(item)}
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold transition-all ${item.color} text-white hover:scale-110 ${selectedTimelineItem === item ? 'ring-4 ring-white' : ''}`}
                    >
                      {item.year}
                    </button>
                  ))}
                </div>
                
                {/* Timeline content - With proper positioning and viewport constraints */}
                <div className="relative w-full h-64 px-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTimelineItem.year}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute rounded-lg p-6 bg-white shadow-lg w-full sm:w-80 md:w-96 
                        ${(selectedTimelineItem.year === 1993) ? 'border-l-4 ' + rainbowColors.redBorder : 
                         (selectedTimelineItem.year === 2001) ? 'border-l-4 ' + rainbowColors.orangeBorder : 
                         (selectedTimelineItem.year === 2008) ? 'border-l-4 ' + rainbowColors.yellowBorder : 
                         (selectedTimelineItem.year === 2015) ? 'border-l-4 ' + rainbowColors.blueBorder : 
                         'border border-purple-300'}`}
                      style={{
                        // Adjusted positioning to ensure content stays within viewport bounds
                        left: selectedTimelineItem.year === 2023 ? 
                          'auto' : // Use auto for the last item
                          `${(bakeryTimeline.findIndex(item => item.year === selectedTimelineItem.year) / (bakeryTimeline.length - 1)) * 100}%`,
                        right: selectedTimelineItem.year === 2023 ? '0' : 'auto', // Right align for 2023
                        // Adjusted transform logic to prevent cutoff
                        transform: selectedTimelineItem.year === 1993 ? 'translateX(0)' : 
                                  selectedTimelineItem.year === 2023 ? 'translateX(0)' : // No transform for 2023 
                                  'translateX(-50%)',
                        zIndex: 20
                      }}
                    >
                      <h3 className={`text-2xl font-bold mb-4 ${
                        selectedTimelineItem.color === rainbowColors.red ? rainbowColors.redText : 
                        selectedTimelineItem.color === rainbowColors.orange ? rainbowColors.orangeText : 
                        selectedTimelineItem.color === rainbowColors.yellow ? rainbowColors.yellowText : 
                        selectedTimelineItem.color === rainbowColors.blue ? rainbowColors.blueText : 
                        rainbowColors.violetText
                      }`}>
                        {selectedTimelineItem.title}
                      </h3>
                      <p className="text-gray-800">
                        {selectedTimelineItem.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>
          
          {/* Bake With Us */}
          <section id="bake-with-us" className="py-20 bg-black/70 backdrop-blur-md text-white">
            <div className="container mx-auto px-4">
              <h2 className="mb-6 text-center text-4xl font-bold">
                <span className={rainbowGradients.textFull}>Bake With Us</span>
              </h2>
              <p className="mb-12 text-center text-lg text-white/90 max-w-2xl mx-auto">
                Join us for a mini bake-along and discover the secrets behind our delicious Ube Ensaymada.
              </p>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto border border-white/20">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <img 
                      src="/api/placeholder/600/500" 
                      alt="Baking step"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-8">
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-purple-300">Step 1 of 3</span>
                        <span className="text-purple-300">Ube Ensaymada</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`${rainbowGradients.full} h-2 rounded-full`}
                          style={{ width: `33%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-6 rounded-lg border-l-4 border-purple-500 bg-black/30">
                      <h3 className="text-2xl font-bold mb-4 text-purple-300">Prepare the Dough</h3>
                      <p className="text-white/80 mb-6">
                        Start with combining flour, sugar, and yeast in a large bowl. Slowly add milk and butter until a soft dough forms. The secret is in the kneading – at least 10 minutes for that perfect texture.
                      </p>
                      <Link 
                        href="/bake-along/ube-ensaymada" 
                        className="inline-block px-6 py-2 rounded-lg bg-purple-500 text-white font-medium transition-all hover:bg-purple-600"
                      >
                        Start Bake-Along
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Blog Section */}
          <section id="blog" className="py-20 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4">
              <h2 className="mb-6 text-center text-4xl font-bold">
                From Our Kitchen <span className={rainbowGradients.textFull}>to Your Table</span>
              </h2>
              <p className="mb-12 text-center text-lg text-gray-700 max-w-2xl mx-auto">
              Stories, tips, and inspirations from behind our bakery counter.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredStories.map((story, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className={`h-2 w-full ${story.color}`}></div>
                    <Link href={story.route}>
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{story.title}</h3>
                      <p className="text-gray-600 mb-4">{story.excerpt}</p>
                      <Link href={story.route} className={`font-medium inline-flex items-center ${
                        story.color === rainbowGradients.redToOrange ? rainbowColors.redText :
                        story.color === rainbowGradients.greenToBlue ? rainbowColors.greenText :
                        rainbowColors.indigoText
                      }`}>
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
        
        </div>
      </AppLayout>
    </>
  );
}