import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
      <>
        {/* Hero Section */}
        <div
          className="hero-section w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 flex items-center justify-center"
          aria-label="Career navigator hero section"
        >
          <div className="hero-content flex flex-col items-center text-center px-4">
            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Career Navigator
            </h1>
            
            {/* Paragraph */}
            <p className="text-lg md:text-2xl mb-8">
              Find your path to success with our personalized career guidance tools and resources.
            </p>
  
            {/* Buttons */}
            <div className="flex space-x-4">
               
              <Link to='feedback'>
              <button className="bg-black hover: bg-gradient-to-br border-black from-blue-900 via-purple-900 to-red-900 text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default HeroSection;
  