
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import WhySerene from '@/components/WhySerene';
import TravelPackages from '@/components/TravelPackages';
import PhotoGallery from '@/pages/PhotoGallery';
import Testimonials from '@/components/Testimonials';
import TripCustomizationForm from '@/components/TripCustomizationForm';
import MapIntegration from '@/components/MapIntegration';
import BlogPreview from '@/components/BlogPreview';
import SEO from '@/components/SEO';
import { useEffect } from 'react';

const Index = () => {
  
  useEffect(() => {
    const contactElements = document.querySelectorAll('[id="contact"]');
    if (contactElements.length > 1) {
      
      contactElements[1].id = 'contact-footer';
    }
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="Serene Lanka Travel - Discover Sri Lanka's Beauty" 
        description="Experience the breathtaking beauty of Sri Lanka with Serene Lanka Travel. Expertly crafted travel packages from pristine beaches to ancient temples."
        imageUrl="/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png"
        keywords={['Sri Lanka travel', 'travel packages', 'Sri Lanka tours', 'Ceylon tourism', 'beach holidays', 'cultural tours', 'adventure travel', 'tropical destinations']}
      />
      <Hero />
      <Features />
      <WhySerene />
      <Projects />
      <TravelPackages />
      {/* <PhotoGallery /> */}
      <Testimonials />
      <TripCustomizationForm />
      {/* <MapIntegration /> */}
      {/* <BlogPreview /> */}
    </PageLayout>
  );
};

export default Index;
