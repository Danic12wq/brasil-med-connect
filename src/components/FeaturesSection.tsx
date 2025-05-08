
import React from 'react';
import { Calendar, Search, MessageSquare, MapPin } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-8 w-8 text-medical-500" />,
    title: 'Busca Inteligente',
    description: 'Encontre especialistas por localização, especialidade, plano de saúde ou disponibilidade.'
  },
  {
    icon: <Calendar className="h-8 w-8 text-medical-500" />,
    title: 'Agendamento Simplificado',
    description: 'Marque consultas em poucos cliques e receba confirmação instantânea.'
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-medical-500" />,
    title: 'Chat Integrado',
    description: 'Comunique-se facilmente com seu médico antes e depois da consulta.'
  },
  {
    icon: <MapPin className="h-8 w-8 text-medical-500" />,
    title: 'Geolocalização',
    description: 'Encontre médicos próximos a você em qualquer lugar do Brasil.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Por que usar o AgendarBrasil?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A plataforma completa para conectar pacientes e médicos de forma simples, rápida e segura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="bg-medical-50 p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
