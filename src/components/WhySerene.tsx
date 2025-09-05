import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Heart, Star, Shield, ArrowRight, MapPin, Calendar, Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const inView = useInView(countRef, {
    once: true,
    margin: "-100px"
  });
  
  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;
    
    const startAnimation = (timestamp: number) => {
      startTime = timestamp;
      animate(timestamp);
    };
    
    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = progress * end;
      setCount(currentCount);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(startAnimation);
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, inView]);
  
  return (
    <span ref={countRef} className="font-bold tabular-nums">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

const WhySerene = () => {
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
  
  return (
    <section id="why-serene" className="relative py-16 md:py-24 bg-gradient-to-b from-white via-travel-sky/5 to-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{
            once: true,
            margin: "-100px"
          }} 
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-travel-ocean mr-3 animate-pulse-slow" />
            <span className="text-travel-ocean font-medium">Why Choose Serene Lanka Travel</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-travel-ocean mb-4">
            Your Gateway to Paradise
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-lg max-w-3xl mx-auto">
            Experience Sri Lanka through the eyes of passionate locals who know every hidden gem, 
            cultural secret, and breathtaking vista this magical island has to offer.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{
            once: true,
            margin: "-100px"
          }} 
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-travel-ocean/5 to-travel-sky/10 p-6 rounded-2xl border border-travel-ocean/20 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-travel-ocean to-travel-sunset flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-travel-ocean text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={500} suffix="+" />
            </h3>
            <p className="text-gray-700">Happy travelers have experienced Sri Lanka's magic through our expertly crafted journeys</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-travel-sunset/5 to-travel-forest/10 p-6 rounded-2xl border border-travel-sunset/20 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-travel-sunset to-travel-forest flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-travel-ocean text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={15} suffix=" Years" /> 
            </h3>
            <p className="text-gray-700">
              of expertise in showcasing Sri Lanka's diverse landscapes, from beaches to mountains to ancient cities
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-travel-forest/5 to-travel-ocean/10 p-6 rounded-2xl border border-travel-forest/20 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-travel-forest to-travel-ocean flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-travel-ocean text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={100} suffix="%" />
            </h3>
            <p className="text-gray-700">
              Authentic Sri Lankan experiences with local insights that you won't find in guidebooks
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mb-12" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{
            once: true,
            margin: "-100px"
          }} 
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-travel-ocean mb-3">
              What Makes Serene Lanka Travel Special
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We don't just show you Sri Lanka – we help you fall in love with it through authentic, 
              personalized experiences that create lifelong memories.
            </p>
          </motion.div>
          
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-travel-ocean/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-travel-ocean/10 to-travel-sunset/10 rounded-full p-3 mr-4">
                  <Heart className="w-6 h-6 text-travel-ocean" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-travel-ocean mb-2">Passionate Local Expertise</h4>
                  <p className="text-gray-700">Born and raised in Sri Lanka, our team shares insider knowledge and hidden gems that transform your journey into an authentic cultural immersion.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-travel-sunset/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-travel-sunset/10 to-travel-forest/10 rounded-full p-3 mr-4">
                  <Calendar className="w-6 h-6 text-travel-ocean" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-travel-ocean mb-2">Personalized Itineraries</h4>
                  <p className="text-gray-700">Every journey is crafted specifically for you, matching your interests, pace, and dreams with Sri Lanka's endless possibilities.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-travel-forest/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-travel-forest/10 to-travel-ocean/10 rounded-full p-3 mr-4">
                  <Shield className="w-6 h-6 text-travel-ocean" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-travel-ocean mb-2">Safe & Sustainable Travel</h4>
                  <p className="text-gray-700">We prioritize your safety and Sri Lanka's future through responsible tourism practices that benefit local communities.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-travel-sky/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-travel-sky/10 to-travel-ocean/10 rounded-full p-3 mr-4">
                  <Star className="w-6 h-6 text-travel-ocean" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-travel-ocean mb-2">Unforgettable Memories</h4>
                  <p className="text-gray-700">From sunrise over Sigiriya to sunset on pristine beaches, we create moments that stay with you long after you return home.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center mt-10">
            <div className="bg-gradient-to-r from-travel-ocean to-travel-sunset p-8 rounded-2xl text-white">
              <h4 className="text-2xl font-bold mb-4">Ready to Discover Sri Lanka?</h4>
              <p className="mb-6 text-white/90">
                Let us create your perfect Sri Lankan adventure, tailored to your dreams and interests.
              </p>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact-info');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center px-8 py-3 bg-white text-travel-ocean rounded-full hover:bg-travel-sky/10 hover:text-white hover:border-white border-2 border-white transition-all group font-semibold"
              >
                Start Planning Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySerene;