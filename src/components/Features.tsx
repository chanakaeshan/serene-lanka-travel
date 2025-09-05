import { useEffect, useRef, useState } from 'react';
import { Palmtree, Mountain, Camera, MapPin, ArrowRight, Plane, Calendar, CheckCircle, Star, Compass, Heart, Users, MessageSquare } from "lucide-react";
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollHijack } from '@/hooks/useScrollHijack';

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const hijackSectionRef = useRef<HTMLDivElement>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const features = [
    {
      icon: <Palmtree className="w-10 h-10 text-white transition-transform duration-300 transform" />,
      title: "Pristine Beaches",
      description: "Discover golden sands and crystal-clear waters along Sri Lanka's stunning coastline. Perfect for relaxation and water sports.",
      image: "https://images.pexels.com/photos/1998438/pexels-photo-1998438.jpeg?_gl=1*1q6slyp*_ga*Njk1MjE0NjE0LjE3NTcwNDY5MjE.*_ga_8JE65Q40S6*czE3NTcwNDY5MjAkbzEkZzEkdDE3NTcwNDY5MzgkajQyJGwwJGgw"
    },
    {
      icon: <Mountain className="w-10 h-10 text-white transition-transform duration-300 transform" />,
      title: "Majestic Mountains",
      description: "Explore tea plantations, hiking trails, and breathtaking viewpoints in the central highlands of Sri Lanka.",
      image: "https://images.unsplash.com/photo-1562832177-fe6a183748ac?q=80&w=1258&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: <Camera className="w-10 h-10 text-white transition-transform duration-300 transform" />,
      title: "Cultural Heritage",
      description: "Immerse yourself in ancient temples, traditional festivals, and rich Sri Lankan culture spanning over 2,500 years.",
      image: "https://cdn.pixabay.com/photo/2013/10/08/18/57/ancient-192801_1280.jpg"
    },
    {
      icon: <Compass className="w-10 h-10 text-white transition-transform duration-300 transform" />,
      title: "Wildlife Adventures",
      description: "Experience incredible wildlife encounters from elephants to leopards in Sri Lanka's pristine national parks.",
      image: "https://images.unsplash.com/photo-1617867644194-550af3ae2c56?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const { isHijacked, currentIndex } = useScrollHijack(hijackSectionRef, features.length);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-info');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in');
          (entry.target as HTMLElement).style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    if (featuresRef.current) {
      const elements = featuresRef.current.querySelectorAll('.feature-item');
      elements.forEach(el => {
        if (!el.classList.contains('animate-slide-in')) {
          (el as HTMLElement).style.opacity = '0';
          observer.observe(el);
        }
      });
    }
    return () => observer.disconnect();
  }, []);

  const travelExperiences = [
    {
      image: "https://plus.unsplash.com/premium_photo-1730145749791-28fc538d7203?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Sigiriya Rock Fortress",
      description: "Climb the ancient rock fortress and marvel at the stunning views and historical frescoes."
    },
    {
      image: "https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2FuZHl8ZW58MHx8MHx8fDA%3D",
      title: "Kandy Temple",
      description: "Visit the sacred Temple of the Tooth and experience traditional Kandyan culture."
    },
    {
      image: "https://images.unsplash.com/photo-1559372122-1a97b2d22c22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RWxsYSUyME5pbmUlMjBBcmNoJTIwQnJpZGdlfGVufDB8fDB8fHww",
      title: "Ella Nine Arch Bridge",
      description: "Walk through emerald tea plantations to reach this iconic colonial-era railway bridge."
    }
  ];

  const travelServices = [
    {
      icon: <Plane className="h-10 w-10 text-travel-ocean" />,
      title: "Luxury Travel Packages",
      description: "Premium accommodations and personalized itineraries for an unforgettable experience"
    },
    {
      icon: <Calendar className="h-10 w-10 text-travel-ocean" />,
      title: "Custom Itinerary Planning",
      description: "Tailored travel plans designed around your interests and preferences"
    },
    {
      icon: <Users className="h-10 w-10 text-travel-ocean" />,
      title: "Expert Local Guides",
      description: "Knowledgeable guides who bring Sri Lankan culture and history to life"
    }
  ];

  return (
    <>
      <section id="features" className="relative bg-gradient-to-b from-white to-travel-sky/10 overflow-hidden py-10 md:py-[50px] w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8" ref={featuresRef}> 
          <div className="text-center mb-10 max-w-3xl mx-auto feature-item">
            <div className="inline-block mb-2 px-4 py-2 bg-gradient-to-r from-travel-ocean to-travel-sunset text-white rounded-full text-sm font-medium">
              Discover Sri Lanka
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-travel-ocean mb-4">
              Explore the Pearl of the Indian Ocean
            </h2>
            <p className="text-gray-600 mt-4">
              From pristine beaches to ancient temples, Sri Lanka offers diverse experiences that captivate every traveler. 
              Let us guide you through this magical island paradise.
            </p>
          </div>
          
          {/* Scroll-hijacked features section */}
          <div 
            ref={hijackSectionRef}
            className={cn(
              "relative transition-all duration-500",
              isHijacked ? "fixed inset-0 z-50 bg-black" : "grid grid-cols-1 md:grid-cols-2 gap-6"
            )}
            style={{ height: isHijacked ? '100vh' : 'auto' }}
          >
            {isHijacked && (
              <div className="absolute top-4 right-4 z-10 text-white text-sm opacity-70">
                {currentIndex + 1} / {features.length}
              </div>
            )}
            
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "feature-item rounded-2xl overflow-hidden transform transition-all duration-500 relative shadow-xl hover:shadow-2xl",
                  isHijacked 
                    ? cn(
                        "absolute inset-0 w-full h-full",
                        index === currentIndex 
                          ? "opacity-100 translate-x-0" 
                          : index < currentIndex 
                            ? "opacity-0 -translate-x-full" 
                            : "opacity-0 translate-x-full"
                      )
                    : "hover:-translate-y-2 h-[320px]"
                )}
                style={{
                  transitionDelay: isHijacked ? '0ms' : `${index * 100}ms`
                }}
                onMouseEnter={() => !isHijacked && setHoveredFeature(index)} 
                onMouseLeave={() => !isHijacked && setHoveredFeature(null)}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-all duration-500" 
                  />
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isHijacked 
                      ? "bg-gradient-to-b from-travel-ocean/30 via-travel-ocean/40 to-travel-ocean/60" 
                      : hoveredFeature === index 
                        ? "bg-gradient-to-b from-travel-ocean/40 via-travel-ocean/50 to-travel-ocean/70" 
                        : "bg-gradient-to-b from-travel-ocean/50 via-travel-ocean/60 to-travel-ocean/80"
                  )}></div>
                </div>
                
                <div className={cn(
                  "relative z-10 flex flex-col justify-end",
                  isHijacked 
                    ? "p-16 h-full text-center items-center justify-center" 
                    : "p-6 h-full"
                )}>
                  <div className={isHijacked ? "space-y-8 text-center" : ""}>
                    <div className={cn(
                      "inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl transition-all duration-300 transform",
                      isHijacked 
                        ? "mb-6 scale-150" 
                        : hoveredFeature === index 
                          ? "mb-4 hover:scale-110 hover:bg-white/30" 
                          : "mb-4"
                    )}>
                      <div className={`transform transition-transform duration-300 ${!isHijacked && hoveredFeature === index ? 'rotate-12' : ''}`}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className={cn(
                      "font-bold text-white",
                      isHijacked ? "text-4xl mb-6" : "text-xl mb-3"
                    )}>
                      {feature.title}
                    </h3>
                    <p className={cn(
                      "text-white/95",
                      isHijacked ? "text-lg max-w-2xl" : "text-sm"
                    )}>
                      {feature.description}
                    </p>
                  </div>
                  {!isHijacked && (
                    <div className={`h-1 bg-gradient-to-r from-travel-sunset to-travel-ocean mt-4 rounded-full transition-all duration-500 ${hoveredFeature === index ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                  )}
                </div>
              </div>
            ))}
            
            {isHijacked && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
                <div className="flex space-x-2 mb-4">
                  {features.map((_, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        index === currentIndex ? "bg-white w-8" : "bg-white/50 w-2"
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm opacity-70">
                  {isMobile ? "Swipe" : "Scroll"} to continue • Press ESC to exit
                </p>
              </div>
            )}
          </div>

          <div className="mt-16 mb-8 feature-item">
            <div className="text-center mb-8">
              <div className="inline-block mb-2 px-4 py-2 bg-gradient-to-r from-travel-sunset to-travel-forest text-white rounded-full text-sm font-medium">
                Must-Visit Destinations
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-travel-ocean">Iconic Sri Lankan Experiences</h3>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Explore Sri Lanka's most breathtaking destinations and create unforgettable memories.
                <span className="block text-sm mt-1 text-travel-ocean">Scroll to see more amazing places →</span>
              </p>
            </div>
            
            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm p-6 feature-item shadow-lg">
              <Carousel className="w-full max-w-7xl mx-auto">
                <CarouselContent className="flex">
                  {travelExperiences.map((experience, index) => (
                    <CarouselItem key={index} className="md:basis-1/3 flex-shrink-0">
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative w-full h-48">
                            <img 
                              src={experience.image} 
                              alt={experience.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </div>
                          <div className="p-6">
                            <h4 className="font-bold text-lg text-travel-ocean mb-2">{experience.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{experience.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-6 gap-2">
                  <CarouselPrevious className="relative left-auto translate-y-0 hover:bg-travel-ocean hover:text-white transition-colors" />
                  <CarouselNext className="relative right-auto translate-y-0 hover:bg-travel-ocean hover:text-white transition-colors" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            onClick={scrollToContact} 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-travel-ocean to-travel-sunset text-white rounded-full shadow-lg hover:shadow-xl transition-all group w-full sm:w-auto hover:scale-105"
          >
            Plan Your Sri Lankan Adventure
            <MessageSquare className="ml-2 w-4 h-4 group-hover:animate-pulse" />
          </Button>
          
          <Button 
            onClick={() => window.scrollTo(0, 0)} 
            className="inline-flex items-center px-6 py-3 bg-white text-travel-ocean rounded-full border-2 border-travel-ocean hover:bg-travel-ocean hover:text-white transition-all group w-full sm:w-auto"
          >
            View All Destinations
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
      
      <section id="travel-services" className="bg-gradient-to-b from-travel-sky/10 to-white py-10 md:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-2 px-4 py-2 bg-gradient-to-r from-travel-forest to-travel-ocean text-white rounded-full text-sm font-medium">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-travel-ocean">How We Make Your Journey Perfect</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Serene Lanka Travel combines local expertise with international standards to create 
              personalized travel experiences that exceed your expectations.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-travel-sky/20 p-8 mb-10 transition-all duration-300 hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {travelServices.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-travel-sky/5 to-travel-ocean/5 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-travel-sky/10 h-full text-center group hover:scale-105">
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-travel-ocean/10 to-travel-sunset/10 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-travel-ocean">{service.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button 
                  onClick={scrollToContact} 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-travel-sunset to-travel-forest text-white rounded-full shadow-lg hover:shadow-xl transition-all group w-full sm:w-auto hover:scale-105"
                >
                  Start Planning Your Trip
                  <Star className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;