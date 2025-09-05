import { ArrowRight, MapPin, Plane, Camera, MessageSquare, Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const isMobile = useIsMobile();
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container relative overflow-hidden h-[60vh] sm:h-[70vh] md:h-[600px] lg:h-[650px] xl:h-[700px] w-full bg-gradient-to-br from-travel-ocean via-travel-sky to-travel-sunset">
        <div className="absolute inset-0 w-full">
          {/* Beautiful tropical beach background */}
          <div 
            className={`w-full h-full bg-cover bg-center opacity-100 ${isMobile ? 'bg-right' : 'bg-center'}`}
            style={{
              backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661832611972-b6ee1aba3581?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-travel-ocean/70 via-travel-ocean/50 to-white/20"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-20 sm:pt-24 md:pt-32 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-5xl text-center" variants={itemVariants}>
              <motion.div className="flex items-center justify-center mb-6" variants={itemVariants}>
                {/* <Globe className="w-8 h-8 md:w-12 md:h-12 text-white mr-3 animate-pulse-slow" /> */}
                <h2 className="text-xl md:text-4xl font-bold text-white/90">Serene Lanka Travel</h2>
              </motion.div>
              <motion.h1 className="banner-title text-white drop-shadow-lg" variants={itemVariants}>
                Discover the Pearl of the Indian Ocean
              </motion.h1>
              <motion.p className=" text-white/90 mt-4 sm:mt-6 drop-shadow-md" variants={itemVariants}>
                Experience the breathtaking beauty of Sri Lanka with our expertly crafted travel packages. 
                From pristine beaches to ancient temples, create memories that last a lifetime.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center items-center" variants={itemVariants}>
                <button 
                  className="w-full sm:w-auto min-h-[44px] px-8 sm:px-10 py-3 bg-white/95 text-travel-ocean rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm flex items-center justify-center group text-sm sm:text-base font-semibold"
                  onClick={e => {
                    e.preventDefault();
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Explore Destinations
                  <Plane className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  className="w-full sm:w-auto min-h-[44px] px-8 sm:px-10 py-3 bg-travel-sunset/90 text-white rounded-full hover:bg-travel-sunset hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm flex items-center justify-center group text-sm sm:text-base font-semibold"
                  onClick={scrollToContact}
                >
                  Plan Your Journey
                  <MessageSquare className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4" variants={containerVariants} initial="hidden" animate="visible" transition={{
        delay: 0.6
      }}>
          <motion.div className="bg-white/95 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-lg border border-travel-sky/20 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-travel-ocean/20" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-travel-ocean to-travel-sky flex items-center justify-center rounded-lg text-white mb-2 md:mb-3">
              <MapPin className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-travel-ocean">Exotic Destinations</h3>
            <p className="text-gray-600 text-xs md:text-sm">Discover hidden gems and iconic landmarks across Sri Lanka's diverse landscapes.</p>
          </motion.div>
          
          <motion.div className="bg-white/95 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-lg border border-travel-sky/20 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-travel-sunset/20" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-travel-sunset to-travel-forest flex items-center justify-center rounded-lg text-white mb-2 md:mb-3">
              <Camera className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-travel-ocean">Cultural Experiences</h3>
            <p className="text-gray-600 text-xs md:text-sm">Immerse yourself in rich traditions, ancient temples, and authentic local experiences.</p>
          </motion.div>
          
          <motion.div className="bg-white/95 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-lg border border-travel-sky/20 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-travel-forest/20" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-travel-forest to-travel-ocean flex items-center justify-center rounded-lg text-white mb-2 md:mb-3">
              <Plane className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-travel-ocean">Tailored Adventures</h3>
            <p className="text-gray-600 text-xs md:text-sm">Personalized itineraries crafted to match your interests and travel style.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};

export default Hero;
