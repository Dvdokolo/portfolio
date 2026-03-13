import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import bgimg from "../images/bgimg.avif"; 

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-gray-900/20 dark:from-blue-900/40 dark:to-gray-900/40 z-0" />
      <div className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20"   style={{ backgroundImage: `url(${bgimg})`}} />
      
      {/* Animated Stars Effect */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-[5rem] font-bold text-gray-800 dark:text-white mb-6">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400  ">David Okolo</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Front-end developer passionate about building intuitive and user-friendly web applications
          </p>
          <div className="md:flex justify-center space-y-10 md:space-y-0 md:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/projects"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Projects
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
              >
                Contact Me
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;