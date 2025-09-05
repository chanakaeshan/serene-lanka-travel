import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import Navbar from "@/components/Navbar";

const packages = [
  {
    id: 1,
    title: "Cultural Heritage Journey",
    location: "Kandy & Sigiriya",
    duration: "7 days",
    price: "From $850",
    rating: 4.9,
    reviews: 124,
    groupSize: "2-12 people",
    imageUrl: "https://images.pexels.com/photos/9013701/pexels-photo-9013701.jpeg",
    highlights: ["Ancient temples", "Royal palaces", "Traditional crafts", "Local cuisine"],
    description: "Explore Sri Lanka's rich cultural heritage with visits to ancient temples, royal palaces, and traditional craft villages.",
    category: "Cultural",
    featured: true
  },
  {
    id: 2,
    title: "Beach Paradise Retreat",
    location: "Mirissa & Unawatuna",
    duration: "5 days",
    price: "From $650",
    rating: 4.8,
    reviews: 89,
    groupSize: "2-8 people",
    imageUrl: "https://images.unsplash.com/photo-1653959699604-1eb000740b57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fFNyaSUyMGxhbmthfGVufDB8fDB8fHww",
    highlights: ["Pristine beaches", "Whale watching", "Water sports", "Sunset dining"],
    description: "Relax on pristine beaches, enjoy whale watching, and indulge in fresh seafood by the ocean.",
    category: "Beach"
  },
  {
    id: 3,
    title: "Adventure Highland Trek",
    location: "Ella & Nuwara Eliya",
    duration: "6 days",
    price: "From $720",
    rating: 4.9,
    reviews: 156,
    groupSize: "4-10 people",
    imageUrl: "https://images.unsplash.com/photo-1649853762237-7ef38a6ea6c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNyaSUyMGxhbmthJTIwbW91bnR8ZW58MHx8MHx8fDA%3D",
    highlights: ["Tea plantations", "Mountain hiking", "Train journeys", "Cool climate"],
    description: "Trek through lush tea plantations, enjoy scenic train rides, and experience the cool mountain climate.",
    category: "Adventure"
  },
  {
    id: 4,
    title: "Wildlife Safari Experience",
    location: "Yala & Udawalawe",
    duration: "4 days",
    price: "From $580",
    rating: 4.7,
    reviews: 78,
    groupSize: "2-6 people",
    imageUrl: "https://images.unsplash.com/photo-1710077539513-6d0b9cf273e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fFlhbGElMjBTYWZhcml8ZW58MHx8MHx8fDA%3D",
    highlights: ["Leopard spotting", "Elephant watching", "Bird sanctuary", "Nature walks"],
    description: "Experience Sri Lanka's incredible wildlife with guided safaris in premier national parks.",
    category: "Wildlife"
  },
  {
    id: 5,
    title: "Wellness & Ayurveda",
    location: "Bentota & Hikkaduwa",
    duration: "8 days",
    price: "From $950",
    rating: 4.8,
    reviews: 93,
    groupSize: "1-4 people",
    imageUrl: "https://heritancehotels.imgix.net/sites/6/2025/01/gallery-treatment-ayuruvedha-opti-50_1-1-Head-Massage-2-7.jpg",
    highlights: ["Ayurvedic treatments", "Yoga sessions", "Meditation", "Spa relaxation"],
    description: "Rejuvenate your body and mind with authentic Ayurvedic treatments and wellness practices.",
    category: "Wellness"
  },
  // {
  //   id: 6,
  //   title: "Complete Island Discovery",
  //   location: "Multi-destination",
  //   duration: "14 days",
  //   price: "From $1,450",
  //   rating: 4.9,
  //   reviews: 201,
  //   groupSize: "2-15 people",
  //   imageUrl: "/lovable-uploads/6b0637e9-4a7b-40d0-b219-c8b7f879f93e.png",
  //   highlights: ["All major attractions", "Cultural sites", "Beaches", "Wildlife parks"],
  //   description: "The ultimate Sri Lankan experience covering all major attractions, from cultural sites to pristine beaches.",
  //   category: "Complete"
  // }
];

const categories = ["All", "Cultural", "Beach", "Adventure", "Wildlife", "Wellness", "Complete"];

const TravelPackages = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isInView, setIsInView] = useState(false);

  const filteredPackages = selectedCategory === "All" 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  const featuredPackage = packages.find(pkg => pkg.featured);
  const regularPackages = packages.filter(pkg => !pkg.featured);
  return (
    <>
      <Navbar/>

      <section id="packages" className="py-36 bg-gradient-to-b from-travel-sky/20 to-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Travel Packages
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Discover Sri Lanka
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ancient temples to pristine beaches, choose your perfect Sri Lankan adventure with our expertly crafted travel packages.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                    : 'hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Package */}
          {featuredPackage && selectedCategory === "All" && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">All Packages</h3>
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-primary/20">
                <div className="grid md:grid-cols-2 h-full">
                  <div 
                    className="relative bg-cover bg-center h-80 md:h-full"
                    style={{ backgroundImage: `url('${featuredPackage.imageUrl}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-secondary-foreground font-semibold">
                        Most Popular
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {featuredPackage.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {featuredPackage.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {featuredPackage.groupSize}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-3xl font-bold text-gray-900">
                          {featuredPackage.title}
                        </h4>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">
                            {featuredPackage.price}
                          </div>
                          <div className="text-sm text-gray-500">per person</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 font-semibold">{featuredPackage.rating}</span>
                        </div>
                        <span className="text-gray-500">({featuredPackage.reviews} reviews)</span>
                      </div>
                      
                      <p className="text-gray-600 mb-6 text-lg">
                        {featuredPackage.description}
                      </p>
                      
                      <div className="mb-6">
                        <h5 className="font-semibold mb-3 text-gray-900">Package Highlights:</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {featuredPackage.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
                      Book This Package
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}

          {/* Regular Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === "All" ? regularPackages : filteredPackages).map((pkg, index) => (
              <Card 
                key={pkg.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group border-gray-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className="relative bg-cover bg-center h-48 group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${pkg.imageUrl}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {pkg.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {pkg.location}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {pkg.title}
                    </h4>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{pkg.price}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {pkg.groupSize}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">{pkg.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({pkg.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {pkg.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {pkg.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{pkg.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
                    View Details
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TravelPackages;