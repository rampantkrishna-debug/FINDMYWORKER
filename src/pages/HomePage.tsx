import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServiceGrid } from '../components/home/ServiceGrid';
import { HowItWorks } from '../components/home/HowItWorks';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { WorkerCTA } from '../components/home/WorkerCTA';
import { TestimonialSection } from '../components/home/TestimonialSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceGrid />
      <HowItWorks />
      <WhyChooseUs />
      <TestimonialSection />
      <WorkerCTA />
    </div>
  );
};

