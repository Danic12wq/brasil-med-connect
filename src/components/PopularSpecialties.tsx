
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useSpecialties } from '@/hooks/useSpecialties';
import { useNavigate } from 'react-router-dom';

const PopularSpecialties = () => {
  const { specialties, isLoading } = useSpecialties();
  const navigate = useNavigate();

  const handleSpecialtyClick = (specialtyId: string) => {
    navigate('/', { state: { selectedSpecialty: specialtyId } });
    
    // Scroll to doctor search section
    const doctorSearchSection = document.getElementById('doctor-search-section');
    if (doctorSearchSection) {
      doctorSearchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Especialidades Populares</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre os melhores especialistas para cuidar da sua saúde
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {specialties.map((specialty, index) => (
              <Card 
                key={specialty.id} 
                className="overflow-hidden card-hover cursor-pointer animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 75}ms` }}
                onClick={() => handleSpecialtyClick(specialty.id)}
              >
                <CardContent className="p-0">
                  <div className="p-5 text-center">
                    <div className="text-4xl mb-3">{specialty.icon || '👨‍⚕️'}</div>
                    <h3 className="font-medium text-lg mb-1 text-gray-800">{specialty.name}</h3>
                    <p className="text-sm text-gray-500">Especialidade médica</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularSpecialties;
