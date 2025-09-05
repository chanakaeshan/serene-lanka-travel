import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Heart, Send, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const tripSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  duration: z.string().min(1, "Please select trip duration"),
  budget: z.string().min(1, "Please select your budget range"),
  groupSize: z.string().min(1, "Please select group size"),
  startDate: z.string().min(1, "Please select preferred start date"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  accommodation: z.string().min(1, "Please select accommodation preference"),
  specialRequests: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  previousTravel: z.string().optional()
});

const interests = [
  "Cultural Heritage", "Beach & Relaxation", "Wildlife Safari", "Adventure & Hiking", 
  "Tea Plantation Tours", "Ayurveda & Wellness", "Photography", "Local Cuisine",
  "Train Journeys", "Temple Visits", "Water Sports", "Nature Walks"
];

const TripCustomizationForm = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<z.infer<typeof tripSchema>>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      interests: []
    }
  });

  const handleInterestToggle = (interest: string) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    
    setSelectedInterests(newInterests);
    setValue("interests", newInterests);
  };

  const onSubmit = async (data: z.infer<typeof tripSchema>) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Trip Request Submitted!",
        description: "Thank you for your interest! We'll contact you within 24 hours with a custom itinerary.",
        duration: 5000,
      });
      
      reset();
      setSelectedInterests([]);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="customize-trip" className="py-16 bg-gradient-to-b from-white to-travel-sky/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Plan Your Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Create Your Perfect Sri Lankan Adventure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your dream trip and we'll craft a personalized itinerary just for you.
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="text-2xl text-center text-gray-900 flex items-center justify-center">
                <Heart className="h-6 w-6 mr-2 text-primary" />
                Trip Customization Form
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      className="mt-1"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-1"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      className="mt-1"
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="startDate" className="text-sm font-semibold text-gray-700">
                      Preferred Start Date *
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      {...register("startDate")}
                      className="mt-1"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                    )}
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Trip Duration *
                    </Label>
                    <Select onValueChange={(value) => setValue("duration", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-5">3-5 days</SelectItem>
                        <SelectItem value="6-9">6-9 days</SelectItem>
                        <SelectItem value="10-14">10-14 days</SelectItem>
                        <SelectItem value="15+">15+ days</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.duration && (
                      <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Group Size *
                    </Label>
                    <Select onValueChange={(value) => setValue("groupSize", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select group size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Solo traveler</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3-4">3-4 people</SelectItem>
                        <SelectItem value="5-8">5-8 people</SelectItem>
                        <SelectItem value="9+">9+ people</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.groupSize && (
                      <p className="text-red-500 text-sm mt-1">{errors.groupSize.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-700">
                      Budget Range *
                    </Label>
                    <Select onValueChange={(value) => setValue("budget", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget ($500-800 per person)</SelectItem>
                        <SelectItem value="mid-range">Mid-range ($800-1200 per person)</SelectItem>
                        <SelectItem value="luxury">Luxury ($1200+ per person)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.budget && (
                      <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                    )}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-4 block">
                    Your Interests * (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={selectedInterests.includes(interest)}
                          onCheckedChange={() => handleInterestToggle(interest)}
                        />
                        <Label
                          htmlFor={interest}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {selectedInterests.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedInterests.map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="secondary" 
                          className="cursor-pointer"
                          onClick={() => handleInterestToggle(interest)}
                        >
                          {interest} ✕
                        </Badge>
                      ))}
                    </div>
                  )}
                  {errors.interests && (
                    <p className="text-red-500 text-sm mt-1">{errors.interests.message}</p>
                  )}
                </div>

                {/* Accommodation */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Accommodation Preference *
                  </Label>
                  <Select onValueChange={(value) => setValue("accommodation", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget hotels/Guesthouses</SelectItem>
                      <SelectItem value="mid-range">Mid-range hotels</SelectItem>
                      <SelectItem value="luxury">Luxury resorts/Hotels</SelectItem>
                      <SelectItem value="boutique">Boutique hotels</SelectItem>
                      <SelectItem value="eco">Eco-lodges</SelectItem>
                      <SelectItem value="mixed">Mix of different types</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.accommodation && (
                    <p className="text-red-500 text-sm mt-1">{errors.accommodation.message}</p>
                  )}
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="dietaryRequirements" className="text-sm font-semibold text-gray-700">
                      Dietary Requirements
                    </Label>
                    <Textarea
                      id="dietaryRequirements"
                      {...register("dietaryRequirements")}
                      className="mt-1"
                      placeholder="Any dietary restrictions or preferences..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="previousTravel" className="text-sm font-semibold text-gray-700">
                      Previous Travel Experience
                    </Label>
                    <Textarea
                      id="previousTravel"
                      {...register("previousTravel")}
                      className="mt-1"
                      placeholder="Tell us about your travel experience..."
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialRequests" className="text-sm font-semibold text-gray-700">
                    Special Requests or Additional Information
                  </Label>
                  <Textarea
                    id="specialRequests"
                    {...register("specialRequests")}
                    className="mt-1"
                    placeholder="Any special requests, celebrations, accessibility needs, or additional information..."
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-lg group"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Trip Request
                        <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-600 mt-4">
                    We'll review your request and send you a personalized itinerary within 24 hours.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TripCustomizationForm;