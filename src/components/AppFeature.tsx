
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AppFeature = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-medical-50 via-blue-50 to-medical-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Agende consultas a qualquer momento, de qualquer lugar</h2>
            <p className="text-lg text-gray-700 mb-8">
              Baixe o aplicativo AgendarBrasil e tenha acesso a milhares de médicos em todo o país, diretamente do seu celular.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Busca por geolocalização para encontrar médicos próximos',
                'Notificações e lembretes de consultas',
                'Chat direto com médicos antes e após consultas',
                'Histórico médico completo em um só lugar'
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-medical-500 p-1 rounded-full text-white mr-3 mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex items-center justify-center gap-2 h-14 border-gray-300">
                <svg viewBox="0 0 384 512" width="24" height="30" aria-hidden="true">
                  <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs">Baixar na</span>
                  <span className="font-semibold">App Store</span>
                </div>
              </Button>
              
              <Button variant="outline" className="flex items-center justify-center gap-2 h-14 border-gray-300">
                <svg viewBox="0 0 512 512" width="24" height="24" aria-hidden="true">
                  <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs">Baixar no</span>
                  <span className="font-semibold">Google Play</span>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center animate-fade-in [animation-delay:200ms]">
            <div className="relative max-w-xs">
              <div className="absolute inset-0 bg-gradient-to-tr from-medical-500/20 to-blue-500/20 rounded-3xl transform rotate-6 scale-105"></div>
              <img 
                src="/placeholder.svg" 
                alt="AgendarBrasil App" 
                className="relative z-10 w-full rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeature;
