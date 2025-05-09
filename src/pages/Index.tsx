
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PopularSpecialties from '@/components/PopularSpecialties';
import DoctorSearch from '@/components/DoctorSearch';
import AppFeature from '@/components/AppFeature';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  const location = useLocation();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | undefined>();

  useEffect(() => {
    if (location.state?.selectedSpecialty) {
      setSelectedSpecialty(location.state.selectedSpecialty);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularSpecialties />
        <div id="doctor-search-section">
          <DoctorSearch />
        </div>
        <AppFeature />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
