
import { useState, useRef, useEffect, TouchEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";

const travelPackages = [
  {
    id: 1,
    title: "Cultural Heritage Journey",
    brand: "Kandy & Sigiriya",
    description: "Explore Sri Lanka's rich cultural heritage with visits to ancient temples, royal palaces, and traditional craft villages.",
    tags: ["Ancient Temples", "Royal Palaces", "Traditional Crafts", "Local Cuisine"],
    imageUrl: "https://images.unsplash.com/photo-1728626674816-9a4310514f18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGthbmR5fGVufDB8fDB8fHww",
    isFeatured: true,
    link: "#packages",
    duration: "7 days",
    price: "From $850"
  },
  {
    id: 2,
    title: "Beach Paradise Retreat",
    brand: "Mirissa & Unawatuna", 
    description: "Relax on pristine beaches, enjoy whale watching, and indulge in fresh seafood by the ocean.",
    tags: ["Pristine Beaches", "Whale Watching", "Water Sports", "Sunset Dining"],
    imageUrl: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3JpJTIwbGFua2F8ZW58MHx8MHx8fDA%3D",
    link: "#packages",
    duration: "5 days",
    price: "From $650"
  },
  {
    id: 3,
    title: "Adventure Highland Trek",
    brand: "Ella & Nuwara Eliya",
    description: "Trek through lush tea plantations, enjoy scenic train rides, and experience the cool mountain climate.",
    tags: ["Tea Plantations", "Mountain Hiking", "Train Journeys", "Cool Climate"],
    imageUrl: "https://images.unsplash.com/photo-1619974643633-12acfdcedd16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TnV3YXJhJTIwRWxpeWF8ZW58MHx8MHx8fDA%3D",
    link: "#packages",
    duration: "6 days", 
    price: "From $720"
  },
  {
    id: 4,
    title: "Wildlife Safari Experience",
    brand: "Yala & Udawalawe",
    description: "Experience Sri Lanka's incredible wildlife with guided safaris in premier national parks.",
    tags: ["Leopard Spotting", "Elephant Watching", "Bird Sanctuary", "Nature Walks"],
    imageUrl: "https://images.unsplash.com/photo-1695173987873-6f157a2d6ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFlhbGF8ZW58MHx8MHx8fDA%3D",
    link: "#packages",
    duration: "4 days",
    price: "From $580"
  },
  {
    id: 5,
    title: "Complete Island Discovery",
    brand: "Multi-destination",
    description: "The ultimate Sri Lankan experience covering all major attractions, from cultural sites to pristine beaches.",
    tags: ["All Major Attractions", "Cultural Sites", "Beaches", "Wildlife Parks"],
    imageUrl: "https://images.pexels.com/photos/30379319/pexels-photo-30379319.jpeg",
    link: "#packages",
    duration: "14 days",
    price: "From $1,450"
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const minSwipeDistance = 50;

  useEffect(() => {
    if (isInView && !isHovering) {
      const interval = setInterval(() => {
        setActiveProject(prev => (prev + 1) % travelPackages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    }, {
      threshold: 0.2
    });
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setActiveProject(prev => (prev + 1) % travelPackages.length);
    } else if (isRightSwipe) {
      setActiveProject(prev => (prev - 1 + travelPackages.length) % travelPackages.length);
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === activeProject) return "scale-100 opacity-100 z-20";
    if (index === (activeProject + 1) % travelPackages.length) return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (index === (activeProject - 1 + travelPackages.length) % travelPackages.length) return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "scale-90 opacity-0";
  };
  
  return <section id="projects" ref={projectsRef} className="bg-white py-[50px] w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`text-center mb-10 max-w-3xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Travel Packages
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Discover Sri Lanka's Wonders
          </h2>
          <p className="text-gray-600">
            From ancient temples to pristine beaches, choose your perfect Sri Lankan adventure with our expertly crafted travel packages.
          </p>
          {isMobile && (
            <div className="flex items-center justify-center mt-4 animate-pulse-slow">
              <div className="flex items-center text-blue-500">
                <ChevronLeft size={16} />
                <p className="text-sm mx-1">Swipe to navigate</p>
                <ChevronRight size={16} />
              </div>
            </div>
          )}
        </div>
        
        <div 
          className="relative h-[550px] overflow-hidden" 
          onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {travelPackages.map((project, index) => (
              <div 
                key={project.id} 
                className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(index)}`} 
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Card className="overflow-hidden h-[500px] border border-gray-100 shadow-sm hover:shadow-md flex flex-col">
                  <div 
                    className="relative bg-black p-6 flex items-center justify-center h-48 overflow-hidden"
                    style={{
                      backgroundImage: `url(${project.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.brand}</h3>
                      <div className="w-12 h-1 bg-white mb-2"></div>
                      <p className="text-white/90 text-sm">{project.title}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="bg-white/20 px-2 py-1 rounded">{project.duration}</span>
                        <span className="bg-white/20 px-2 py-1 rounded">{project.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1 text-gray-800 group-hover:text-gray-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">{project.brand}</p>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{project.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs animate-pulse-slow" 
                            style={{ animationDelay: `${idx * 300}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={project.link} 
                        className="text-gray-500 flex items-center hover:underline relative overflow-hidden group"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <span className="relative z-10">View Package</span>
                        <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-500 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {!isMobile && (
            <>
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110" 
                onClick={() => setActiveProject(prev => (prev - 1 + travelPackages.length) % travelPackages.length)}
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110" 
                onClick={() => setActiveProject(prev => (prev + 1) % travelPackages.length)}
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            {travelPackages.map((_, idx) => (
              <button 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeProject === idx ? 'bg-gray-500 w-5' : 'bg-gray-200 hover:bg-gray-300'}`} 
                onClick={() => setActiveProject(idx)}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>;
};

export default Projects;
