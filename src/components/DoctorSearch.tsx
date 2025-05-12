import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useDoctors } from '@/hooks/useDoctors';
import { useAuth } from '@/contexts/AuthContext';
import SearchFilters from './doctor/SearchFilters';
import DoctorCard from './doctor/DoctorCard';
import PaginationControls from './doctor/PaginationControls';
import LoadingIndicator from './doctor/LoadingIndicator';

const DoctorSearch = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('São Paulo, SP');
  
  const { 
    doctors, 
    isLoading, 
    toggleSpecialty,
    selectedSpecialties,
    currentPage,
    setCurrentPage,
    totalPages,
    setSearch,
    setLocationFilter
  } = useDoctors();

  const handleSearch = () => {
    setSearch(searchInput);
    setLocationFilter(locationInput);
    setCurrentPage(1);
  };
  
  const handleScheduleAppointment = (doctorId: string) => {
    if (!isAuthenticated) {
      toast.error("É necessário fazer login para agendar uma consulta");
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    
    // Navigate to the scheduling page
    navigate(`/schedule/${doctorId}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Encontre especialistas</h2>
        
        <SearchFilters 
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          locationInput={locationInput}
          setLocationInput={setLocationInput}
          handleSearch={handleSearch}
          toggleSpecialty={toggleSpecialty}
          selectedSpecialties={selectedSpecialties}
        />
        
        {isLoading ? (
          <LoadingIndicator />
        ) : doctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Nenhum médico encontrado. Tente ajustar os filtros de busca.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {doctors.map((doctor, index) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                index={index}
                handleScheduleAppointment={handleScheduleAppointment}
              />
            ))}
          </div>
        )}
        
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default DoctorSearch;
