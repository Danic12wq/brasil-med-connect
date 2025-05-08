
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const specialties = [
  {
    name: 'Clínico Geral',
    icon: '👨‍⚕️',
    count: '3.245 médicos'
  },
  {
    name: 'Pediatria',
    icon: '👶',
    count: '1.893 médicos'
  },
  {
    name: 'Cardiologia',
    icon: '❤️',
    count: '1.578 médicos'
  },
  {
    name: 'Psiquiatria',
    icon: '🧠',
    count: '2.134 médicos'
  },
  {
    name: 'Dermatologia',
    icon: '🧴',
    count: '982 médicos'
  },
  {
    name: 'Ortopedia',
    icon: '🦴',
    count: '1.432 médicos'
  },
  {
    name: 'Oftalmologia',
    icon: '👁️',
    count: '874 médicos'
  },
  {
    name: 'Ginecologia',
    icon: '👩‍⚕️',
    count: '1.653 médicos'
  }
];

const PopularSpecialties = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Especialidades Populares</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre os melhores especialistas para cuidar da sua saúde
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {specialties.map((specialty, index) => (
            <Card 
              key={index} 
              className="overflow-hidden card-hover cursor-pointer animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 75}ms` }}
            >
              <CardContent className="p-0">
                <div className="p-5 text-center">
                  <div className="text-4xl mb-3">{specialty.icon}</div>
                  <h3 className="font-medium text-lg mb-1 text-gray-800">{specialty.name}</h3>
                  <p className="text-sm text-gray-500">{specialty.count}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSpecialties;
