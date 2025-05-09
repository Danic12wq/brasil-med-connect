
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useSpecialties } from '@/hooks/useSpecialties';

interface SearchFiltersProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  locationInput: string;
  setLocationInput: (value: string) => void;
  handleSearch: () => void;
  toggleSpecialty: (specialtyId: string) => void;
  selectedSpecialties: string[];
}

const SearchFilters = ({
  searchInput,
  setSearchInput,
  locationInput,
  setLocationInput,
  handleSearch,
  toggleSpecialty,
  selectedSpecialties
}: SearchFiltersProps) => {
  const { specialties, isLoading: specialtiesLoading } = useSpecialties();

  return (
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
  );
};

export default SearchFilters;
