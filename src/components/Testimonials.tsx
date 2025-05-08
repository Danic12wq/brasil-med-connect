
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: 'Ana Silva',
    location: 'Rio de Janeiro, RJ',
    quote: 'O AgendarBrasil mudou minha relação com consultas médicas. Agora posso agendar rapidamente e comparar diferentes médicos, tudo em um só lugar.',
    avatar: '/placeholder.svg',
  },
  {
    name: 'Dr. Carlos Mendes',
    location: 'São Paulo, SP',
    quote: 'Como médico, o sistema me permite gerenciar minha agenda com eficiência e me comunicar melhor com meus pacientes. Recomendo a todos os colegas.',
    avatar: '/placeholder.svg',
  },
  {
    name: 'Fernanda Costa',
    location: 'Belo Horizonte, MG',
    quote: 'A facilidade de marcar consultas para toda a família e o sistema de lembretes são fantásticos. Nunca mais perdi uma consulta!',
    avatar: '/placeholder.svg',
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">O que dizem sobre nós</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Milhares de pacientes e médicos já utilizam o AgendarBrasil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="mb-3 text-yellow-400">★★★★★</div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
