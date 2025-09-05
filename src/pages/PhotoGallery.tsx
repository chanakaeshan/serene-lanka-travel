import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ZoomIn, MapPin } from 'lucide-react';
import Navbar from "@/components/Navbar";

const galleryImages = [
  {
    id: 1,
    url: "/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png",
    title: "Sigiriya Rock Fortress",
    location: "Sigiriya",
    category: "Cultural",
    description: "Ancient rock fortress and UNESCO World Heritage site rising 200 meters above the surrounding plains."
  },
  {
    id: 2,
    url: "/lovable-uploads/6fdd3d0d-5dca-470a-a845-bd7b07bff599.png",
    title: "Pristine Beach Paradise",
    location: "Mirissa",
    category: "Beach",
    description: "Crystal clear waters and golden sand beaches perfect for relaxation and water activities."
  },
  {
    id: 3,
    url: "/lovable-uploads/700e27d7-0513-4bfa-8ac4-f7fd6087594c.png",
    title: "Lush Tea Plantations",
    location: "Ella",
    category: "Nature",
    description: "Rolling hills covered in emerald tea plantations with breathtaking mountain views."
  },
  {
    id: 4,
    url: "/lovable-uploads/93ab0638-8190-4ccf-897f-21fda7f4f5ad.png",
    title: "Wildlife Safari Adventure",
    location: "Yala National Park",
    category: "Wildlife",
    description: "Spot leopards, elephants, and diverse wildlife in their natural habitat."
  },
  {
    id: 5,
    url: "/lovable-uploads/5ca619e6-2139-4879-9b3c-94777ab85e2a.png",
    title: "Serene Temple Complex",
    location: "Kandy",
    category: "Cultural",
    description: "Sacred Buddhist temples offering peace and spiritual tranquility."
  },
  {
    id: 6,
    url: "/lovable-uploads/6b0637e9-4a7b-40d0-b219-c8b7f879f93e.png",
    title: "Coastal Train Journey",
    location: "Galle to Colombo",
    category: "Experience",
    description: "Scenic train ride along the coast with stunning ocean views."
  },
  {
    id: 7,
    url: "/lovable-uploads/b0622048-17b4-4c75-a3f0-6c9e17de1d09.png",
    title: "Traditional Village Life",
    location: "Dambulla",
    category: "Cultural",
    description: "Experience authentic Sri Lankan village life and local traditions."
  },
  {
    id: 8,
    url: "/lovable-uploads/c30e0487-2fa0-41d1-9a0b-699cb2855388.png",
    title: "Sunset Over the Ocean",
    location: "Unawatuna",
    category: "Beach",
    description: "Spectacular sunsets painting the sky in vibrant colors over the Indian Ocean."
  },
  {
    id: 9,
    url: "/lovable-uploads/d5ce901e-2ce0-4f2a-bce1-f0ca5d6192df.png",
    title: "Mountain Hiking Trail",
    location: "Adam's Peak",
    category: "Adventure",
    description: "Challenging hikes leading to breathtaking panoramic views."
  }
];

const categories = ["All", "Cultural", "Beach", "Nature", "Wildlife", "Experience", "Adventure"];

const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <Navbar/>

      <section id="gallery" className="py-36 bg-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
              Photo Gallery
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Capturing Sri Lanka's Beauty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the stunning landscapes, rich culture, and vibrant experiences that await you in Sri Lanka.
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
                    ? 'bg-accent text-accent-foreground shadow-lg scale-105' 
                    : 'hover:bg-accent/10 hover:text-accent'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id}
                className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-gray-200"
                onClick={() => setSelectedImage(image)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-white/20 text-white border-white/30">
                          {image.category}
                        </Badge>
                        <ZoomIn className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {image.location}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="relative max-w-4xl w-full max-h-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
                
                <div className="bg-white rounded-lg overflow-hidden">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedImage.title}
                        </h3>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedImage.location}
                        </div>
                      </div>
                      <Badge className="bg-accent/10 text-accent">
                        {selectedImage.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Ready to Create Your Own Memories?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join us on an unforgettable journey through Sri Lanka and capture your own stunning moments.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Plan Your Trip
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotoGallery;