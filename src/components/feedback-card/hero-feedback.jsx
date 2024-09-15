import { motion } from 'framer-motion';

function HeroSection() {
    return (
        <div 
            className="relative h-screen flex items-center justify-center overflow-hidden" 
            style={{
                background: 'linear-gradient(135deg, #1e3a8a, #7f1d1d, #d97706)'
            }}
        >
            {/* Background Image */}
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <img
                    src=""
                    alt="Hero Background"
                    className="object-cover w-full h-full"
                />
            </motion.div>
            
            {/* Content */}
            <div className="relative text-center text-white z-10 px-4 md:px-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Welcome to Career Navigator
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Discover a world of endless oppurtunities in Tech World
                </p>
                <a
                    href="feedback-form"
                    className="inline-block py-3 px-6 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
                >
                    Get Started
                </a>
            </div>
        </div>
    );
}

export default HeroSection;
