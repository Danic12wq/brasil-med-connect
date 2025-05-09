
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Calendar, Heart, Clock, Check } from "lucide-react";
import { useDoctors } from '@/hooks/useDoctors';
import { useSpecialties } from '@/hooks/useSpecialties';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const DoctorSearch = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('São Paulo, SP');
  
  const { specialties, isLoading: specialtiesLoading } = useSpecialties();
  
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
    
    // For now just show a message, in the future we'll redirect to scheduling page
    toast.success("Funcionalidade de agendamento em breve!");
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Encontre especialistas</h2>
        
        <div className="mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex items-center border rounded-lg p-3 bg-gray-50">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Especialidade ou nome do médico" 
                className="flex-1 outline-none bg-transparent"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center border rounded-lg p-3 bg-gray-50">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Localização" 
                className="flex-1 outline-none bg-transparent"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
            </div>
            <Button 
              className="bg-medical-500 hover:bg-medical-600 w-full md:w-auto"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {specialtiesLoading ? (
              <div>Carregando especialidades...</div>
            ) : (
              specialties.map((specialty) => (
                <Button
                  key={specialty.id}
                  variant={selectedSpecialties.includes(specialty.id) ? "default" : "outline"}
                  className={`text-sm px-3 py-1 h-auto ${
                    selectedSpecialties.includes(specialty.id) 
                      ? "bg-medical-500 hover:bg-medical-600" 
                      : "hover:text-medical-600"
                  }`}
                  onClick={() => toggleSpecialty(specialty.id)}
                >
                  {specialty.name}
                </Button>
              ))
            )}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Nenhum médico encontrado. Tente ajustar os filtros de busca.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {doctors.map((doctor, index) => (
              <Card 
                key={doctor.id}
                className="overflow-hidden card-hover animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="flex flex-row md:flex-col items-center md:items-start space-x-4 md:space-x-0">
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-medical-100 flex-shrink-0">
                        <img 
                          src="/placeholder.svg" 
                          alt={doctor.full_name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:mt-3">
                        <h3 className="font-semibold text-lg text-gray-900">{doctor.full_name}</h3>
                        <p className="text-medical-600 font-medium">{doctor.specialty?.name}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center text-yellow-400">
                            {'★'.repeat(4)}
                            {'☆'.repeat(1)}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">(10)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-700">{doctor.address}</p>
                          <p className="text-sm text-gray-500">2,5 km de distância</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <p className="text-gray-700">CRM: {doctor.crm}</p>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="text-gray-400 mr-2 flex-shrink-0 mt-1">Bio:</div>
                        <p className="text-gray-700">{doctor.bio.substring(0, 100)}...</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-sm text-gray-600">{doctor.accepts_insurance ? 'Aceita convênios' : 'Não aceita convênios'}</span>
                        {doctor.accepts_insurance && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            Convênios
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end justify-between">
                      <div className="flex flex-col items-center md:items-end">
                        <span className="text-sm text-gray-500">Consulta particular</span>
                        <span className="text-xl font-bold text-gray-900">R$ {Math.floor(Math.random() * 300) + 150},00</span>
                      </div>
                      
                      <div className="flex flex-col space-y-2 w-full md:w-auto">
                        <Button 
                          className="bg-medical-500 hover:bg-medical-600 btn-hover"
                          onClick={() => handleScheduleAppointment(doctor.id)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Agendar consulta
                        </Button>
                        <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                          <Heart className="h-4 w-4 mr-2" />
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorSearch;
