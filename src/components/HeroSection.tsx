
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-medical-50 to-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in [animation-delay:200ms]">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Agende consultas médicas em minutos
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Encontre especialistas perto de você, compare horários disponíveis e agende consultas com praticidade e segurança.
            </p>
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-medical-100 p-2 rounded-full">
                  <Search className="h-5 w-5 text-medical-600" />
                </div>
                <input 
                  type="text" 
                  placeholder="Buscar especialidade médica" 
                  className="flex-1 outline-none focus:ring-0 border-none text-gray-600 placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-medical-100 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-medical-600" />
                </div>
                <input 
                  type="text" 
                  placeholder="Sua localização" 
                  className="flex-1 outline-none focus:ring-0 border-none text-gray-600 placeholder:text-gray-400"
                />
              </div>
              <Button className="w-full bg-medical-500 hover:bg-medical-600 btn-hover">
                Buscar médicos
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center animate-fade-in [animation-delay:400ms]">
            <div className="relative">
              <div className="absolute -left-6 -top-6 w-40 h-40 bg-medical-200 rounded-full opacity-50"></div>
              <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-blue-200 rounded-full opacity-40"></div>
              <img 
                src="/placeholder.svg" 
                alt="Doctor consultation" 
                className="w-full max-w-md relative z-10 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
