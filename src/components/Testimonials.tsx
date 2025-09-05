import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "London, UK",
    tripType: "Cultural Heritage Journey",
    rating: 5,
    date: "March 2024",
    quote: "Absolutely incredible experience! The cultural sites were breathtaking and our guide was incredibly knowledgeable. Every detail was perfectly planned.",
    longReview: "From the moment we arrived, everything was seamlessly organized. The Temple of the Tooth in Kandy was magical, and climbing Sigiriya at sunrise was unforgettable. The local cuisine experiences were authentic and delicious. I can't recommend Serene Lanka Travel enough!",
    avatar: "/lovable-uploads/a1ef45a0-dde4-4b30-856f-8032dd58247e.png",
    tripImage: "/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Sydney, Australia",
    tripType: "Adventure Highland Trek",
    rating: 5,
    date: "February 2024",
    quote: "The tea plantation trek was beyond my expectations. Stunning views, friendly locals, and the train journey was like something from a movie!",
    longReview: "As an avid hiker, I was looking for something challenging yet scenic. The trek through Ella's tea plantations exceeded all expectations. The views were spectacular, and the train ride from Kandy to Ella was truly magical. Our guide's local knowledge made all the difference.",
    avatar: "/lovable-uploads/aa5291bd-2417-4c1e-9a02-0bcc71a92507.png",
    tripImage: "/lovable-uploads/700e27d7-0513-4bfa-8ac4-f7fd6087594c.png"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    tripType: "Beach Paradise Retreat",
    rating: 5,
    date: "January 2024",
    quote: "Pure paradise! The beaches were pristine, whale watching was incredible, and the seafood was the freshest I've ever had. Perfect honeymoon destination!",
    longReview: "We chose Sri Lanka for our honeymoon and it was the perfect choice. The beaches in Mirissa were absolutely stunning with crystal clear water. Whale watching was a highlight - we saw blue whales and dolphins! The beachside dinners watching the sunset were incredibly romantic.",
    avatar: "/lovable-uploads/af5ee2ce-3942-48bb-a2ad-3b49b419daf9.png",
    tripImage: "/lovable-uploads/6fdd3d0d-5dca-470a-a845-bd7b07bff599.png"
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Toronto, Canada",
    tripType: "Wildlife Safari Experience",
    rating: 5,
    date: "April 2024",
    quote: "Saw my first wild leopard in Yala! The wildlife diversity is incredible. Professional guides and comfortable accommodations made it perfect.",
    longReview: "As a wildlife photographer, Sri Lanka exceeded my expectations. We spotted leopards, elephants, sloth bears, and countless bird species. The guides knew exactly where to find the animals and were incredibly patient with my photography needs. Yala National Park is a true gem.",
    avatar: "/lovable-uploads/b862d5ae-6abb-44da-84f0-00a222f62906.png",
    tripImage: "/lovable-uploads/93ab0638-8190-4ccf-897f-21fda7f4f5ad.png"
  },
  {
    id: 5,
    name: "Lisa Wagner",
    location: "Berlin, Germany",
    tripType: "Wellness & Ayurveda",
    rating: 5,
    date: "May 2024",
    quote: "The Ayurvedic treatments were transformative. I felt completely rejuvenated and learned so much about holistic wellness. A truly healing experience.",
    longReview: "I came to Sri Lanka feeling burnt out from work. The Ayurvedic retreat was exactly what I needed. The treatments were authentic, the practitioners were highly skilled, and the peaceful environment allowed for deep relaxation. I returned home feeling like a new person.",
    avatar: "/lovable-uploads/c5f8ee24-9815-4ebe-b65d-6f3d449feb8b.png",
    tripImage: "/lovable-uploads/5ca619e6-2139-4879-9b3c-94777ab85e2a.png"
  },
  {
    id: 6,
    name: "Robert Kim",
    location: "Seoul, South Korea",
    tripType: "Complete Island Discovery",
    rating: 5,
    date: "March 2024",
    quote: "Two weeks of pure adventure! From ancient temples to pristine beaches to wildlife safaris - Sri Lanka has it all. Expertly organized from start to finish.",
    longReview: "This comprehensive tour showed us the best of Sri Lanka. We experienced the cultural triangle, relaxed on beautiful beaches, went on exciting safaris, and trekked through tea plantations. Every day brought new wonders. The logistics were flawless and our guides were exceptional.",
    avatar: "/lovable-uploads/cbd073dd-ecad-4643-bf2b-efc3d5846994.png",
    tripImage: "/lovable-uploads/6b0637e9-4a7b-40d0-b219-c8b7f879f93e.png"
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentReview = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-travel-sand/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
            Traveler Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from real travelers who have discovered the magic of Sri Lanka with us.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="overflow-hidden shadow-2xl border-0 bg-white">
            <div className="grid md:grid-cols-2 h-full">
              {/* Image Side */}
              <div 
                className="relative bg-cover bg-center h-64 md:h-full min-h-[400px]"
                style={{ backgroundImage: `url('${currentReview.tripImage}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <Badge className="bg-white/20 text-white border-white/30 mb-2">
                    {currentReview.tripType}
                  </Badge>
                  <h4 className="text-2xl font-bold">{currentReview.name}</h4>
                  <p className="text-white/90">{currentReview.location}</p>
                </div>
              </div>

              {/* Content Side */}
              <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <Quote className="h-12 w-12 text-secondary mb-4" />
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < currentReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">{currentReview.date}</span>
                  </div>
                </div>

                <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 leading-relaxed italic">
                  "{currentReview.quote}"
                </blockquote>

                <div className="text-gray-600 leading-relaxed mb-6">
                  {currentReview.longReview}
                </div>

                <div className="flex items-center">
                  <img 
                    src={currentReview.avatar} 
                    alt={currentReview.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-secondary/20"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{currentReview.name}</div>
                    <div className="text-sm text-gray-600">{currentReview.location}</div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonial(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-secondary w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Additional Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.filter((_, index) => index !== currentTestimonial).slice(0, 3).map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-gray-200"
              onClick={() => {
                setCurrentTestimonial(testimonials.findIndex(t => t.id === testimonial.id));
                setIsAutoPlaying(false);
              }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.location}</div>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-2 text-xs text-gray-500">{testimonial.date}</span>
              </div>

              <Badge variant="outline" className="mb-3 text-xs">
                {testimonial.tripType}
              </Badge>

              <p className="text-sm text-gray-600 italic">
                "{testimonial.quote}"
              </p>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">5</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;