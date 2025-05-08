
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Calendar, Heart, Clock, Check } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  price: string;
  nextAvailable: string;
  avatar: string;
  insurances: string[];
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Ricardo Oliveira',
    specialty: 'Cardiologia',
    rating: 4.9,
    reviews: 124,
    location: 'São Paulo, SP',
    distance: '2,3 km',
    price: 'R$ 280,00',
    nextAvailable: 'Hoje, 14:30',
    avatar: '/placeholder.svg',
    insurances: ['Unimed', 'Bradesco Saúde', 'SulAmérica']
  },
  {
    id: 2,
    name: 'Dra. Mariana Santos',
    specialty: 'Psiquiatria',
    rating: 4.8,
    reviews: 98,
    location: 'São Paulo, SP',
    distance: '3,5 km',
    price: 'R$ 320,00',
    nextAvailable: 'Amanhã, 10:15',
    avatar: '/placeholder.svg',
    insurances: ['Unimed', 'SulAmérica']
  },
  {
    id: 3,
    name: 'Dr. Paulo Mendes',
    specialty: 'Clínico Geral',
    rating: 4.7,
    reviews: 156,
    location: 'São Paulo, SP',
    distance: '1,8 km',
    price: 'R$ 190,00',
    nextAvailable: 'Hoje, 17:00',
    avatar: '/placeholder.svg',
    insurances: ['Bradesco Saúde', 'Amil', 'Porto Seguro']
  },
];

const filters = [
  { name: 'Cardiologia', active: false },
  { name: 'Psiquiatria', active: false },
  { name: 'Clínico Geral', active: true },
  { name: 'Pediatria', active: false },
  { name: 'Dermatologia', active: false }
];

const DoctorSearch = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>(['Clínico Geral']);

  const toggleFilter = (filterName: string) => {
    if (activeFilters.includes(filterName)) {
      setActiveFilters(activeFilters.filter(f => f !== filterName));
    } else {
      setActiveFilters([...activeFilters, filterName]);
    }
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
              />
            </div>
            <div className="flex-1 flex items-center border rounded-lg p-3 bg-gray-50">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Localização" 
                className="flex-1 outline-none bg-transparent"
                defaultValue="São Paulo, SP"
              />
            </div>
            <Button className="bg-medical-500 hover:bg-medical-600 w-full md:w-auto">
              Buscar
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <Button
                key={index}
                variant={activeFilters.includes(filter.name) ? "default" : "outline"}
                className={`text-sm px-3 py-1 h-auto ${
                  activeFilters.includes(filter.name) 
                    ? "bg-medical-500 hover:bg-medical-600" 
                    : "hover:text-medical-600"
                }`}
                onClick={() => toggleFilter(filter.name)}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </div>
        
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
                        src={doctor.avatar} 
                        alt={doctor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:mt-3">
                      <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                      <p className="text-medical-600 font-medium">{doctor.specialty}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-400">
                          {'★'.repeat(Math.floor(doctor.rating))}
                          {doctor.rating % 1 > 0 ? '☆' : ''}
                          {'☆'.repeat(5 - Math.ceil(doctor.rating))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({doctor.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 space-y-3">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700">{doctor.location}</p>
                        <p className="text-sm text-gray-500">{doctor.distance} de distância</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-gray-700">Próxima disponível: <span className="text-medical-600 font-medium">{doctor.nextAvailable}</span></p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-sm text-gray-600">Aceita:</span>
                      {doctor.insurances.map((insurance, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          {insurance}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center md:items-end justify-between">
                    <div className="flex flex-col items-center md:items-end">
                      <span className="text-sm text-gray-500">Consulta particular</span>
                      <span className="text-xl font-bold text-gray-900">{doctor.price}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-2 w-full md:w-auto">
                      <Button className="bg-medical-500 hover:bg-medical-600 btn-hover">
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
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-medical-200 text-medical-700 hover:bg-medical-50">
            Carregar mais médicos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DoctorSearch;
