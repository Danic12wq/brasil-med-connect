
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Heart, Clock, Check } from "lucide-react";
import { DoctorWithSpecialty } from '@/hooks/useDoctors';

interface DoctorCardProps {
  doctor: DoctorWithSpecialty;
  index: number;
  handleScheduleAppointment: (doctorId: string) => void;
}

const DoctorCard = ({ doctor, index, handleScheduleAppointment }: DoctorCardProps) => {
  const onScheduleClick = () => {
    handleScheduleAppointment(doctor.id);
  };
  
  return (
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
                onClick={onScheduleClick}
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
  );
};

export default DoctorCard;
