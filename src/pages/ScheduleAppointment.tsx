
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppointment } from '@/hooks/useAppointment';
import DateSelector from '@/components/appointment/DateSelector';
import TimeSlots from '@/components/appointment/TimeSlots';
import NotesField from '@/components/appointment/NotesField';
import AppointmentLoading from '@/components/appointment/AppointmentLoading';

const ScheduleAppointment = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const { user, isAuthenticated } = useAuth();
  
  const {
    doctor,
    isLoadingDoctor,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    notes,
    setNotes,
    isSubmitting,
    handleSubmit,
    handleCancel,
    availableTimes
  } = useAppointment(doctorId, user?.id);

  if (isLoadingDoctor) {
    return <AppointmentLoading />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Agendar Consulta</CardTitle>
          {doctor && (
            <CardDescription>
              Dr. {doctor.full_name} - {doctor.specialty?.name}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DateSelector 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            
            <TimeSlots 
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              availableTimes={availableTimes}
            />
          </div>
          
          <NotesField 
            notes={notes}
            setNotes={setNotes}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="outline" 
            className="mr-2"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime || isSubmitting}
          >
            Confirmar agendamento
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScheduleAppointment;
