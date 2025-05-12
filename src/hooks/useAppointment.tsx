
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { toast } from "sonner";

// Define types
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

// Available time slots
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

export const useAppointment = (doctorId: string | undefined, userId: string | undefined) => {
  const navigate = useNavigate();
  
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
      
      // Extract specialty name safely
      let specialtyName = '';
      
      if (data.specialty) {
        if (Array.isArray(data.specialty)) {
          // Handle array case
          if (data.specialty.length > 0 && data.specialty[0]) {
            specialtyName = String(data.specialty[0].name || '');
          }
        } else {
          // Handle object case
          specialtyName = String(data.specialty.name || '');
        }
      }
      
      // Transform data to match DoctorDetails interface
      return {
        id: data.id,
        full_name: data.full_name,
        specialty: {
          name: specialtyName
        }
      } as DoctorDetails;
    },
    enabled: !!doctorId,
  });

  // Get patient ID from the database based on the logged-in user
  const { data: patient } = useQuery({
    queryKey: ['patient', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
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

  const handleCancel = () => {
    navigate(-1);
  };

  return {
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
    availableTimes: AVAILABLE_TIMES
  };
};
