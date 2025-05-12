
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { format, addDays } from 'date-fns';
import { pt } from 'date-fns/locale';
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Clock, ArrowRight } from 'lucide-react';

interface DoctorDetails {
  id: string;
  full_name: string;
  specialty: {
    name: string;
  };
}

interface AppointmentData {
  doctor_id: string;
  patient_id: string;
  appointment_date: string; // ISO format date
  start_time: string; // HH:MM format
  end_time: string; // HH:MM format
  notes: string;
}

const AVAILABLE_TIMES = [
  { start: '09:00', end: '09:30' },
  { start: '09:30', end: '10:00' },
  { start: '10:00', end: '10:30' },
  { start: '10:30', end: '11:00' },
  { start: '11:00', end: '11:30' },
  { start: '11:30', end: '12:00' },
  { start: '14:00', end: '14:30' },
  { start: '14:30', end: '15:00' },
  { start: '15:00', end: '15:30' },
  { start: '15:30', end: '16:00' },
  { start: '16:00', end: '16:30' },
  { start: '16:30', end: '17:00' },
];

const ScheduleAppointment = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch doctor details
  const { data: doctor, isLoading: isLoadingDoctor } = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: async () => {
      if (!doctorId) throw new Error('Doctor ID is required');
      
      const { data, error } = await supabase
        .from('doctors')
        .select('id, full_name, specialty_id, specialty:specialty_id(name)')
        .eq('id', doctorId)
        .single();
      
      if (error) throw error;
      return data as DoctorDetails;
    },
    enabled: !!doctorId && isAuthenticated,
  });

  // Get patient ID from the database based on the logged-in user
  const { data: patient } = useQuery({
    queryKey: ['patient', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && isAuthenticated,
  });

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !doctor || !patient) {
      toast.error('Por favor, selecione uma data e horário');
      return;
    }

    try {
      setIsSubmitting(true);

      // Format the date to ISO format
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      // Get start and end time from the selected time slot
      const [start, end] = selectedTime.split('-').map(t => t.trim());
      
      const appointmentData: AppointmentData = {
        doctor_id: doctor.id,
        patient_id: patient.id,
        appointment_date: formattedDate,
        start_time: start,
        end_time: end,
        notes: notes.trim(),
      };

      const { error } = await supabase
        .from('appointments')
        .insert(appointmentData);

      if (error) {
        console.error('Error creating appointment:', error);
        toast.error('Erro ao agendar consulta. Por favor, tente novamente.');
        return;
      }

      toast.success('Consulta agendada com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Erro ao agendar consulta. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingDoctor) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
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
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Selecione uma data</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    // Disable past dates, weekends, and dates more than 30 days in the future
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    const maxDate = addDays(now, 30);
                    const day = date.getDay();
                    return date < now || date > maxDate || day === 0 || day === 6;
                  }}
                  className="border rounded-md"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Selecione um horário</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AVAILABLE_TIMES.map((time) => (
                  <Button
                    key={time.start}
                    variant={selectedTime === `${time.start}-${time.end}` ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSelectedTime(`${time.start}-${time.end}`)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time.start}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Observações (opcional)</h3>
            <Textarea 
              placeholder="Descreva brevemente o motivo da consulta ou quaisquer sintomas relevantes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="outline" 
            className="mr-2"
            onClick={() => navigate(-1)}
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
