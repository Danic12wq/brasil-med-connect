
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PopularSpecialties from '@/components/PopularSpecialties';
import DoctorSearch from '@/components/DoctorSearch';
import AppFeature from '@/components/AppFeature';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularSpecialties />
        <DoctorSearch />
        <AppFeature />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
