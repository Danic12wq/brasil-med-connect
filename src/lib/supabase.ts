
import { createClient } from '@supabase/supabase-js';

// These will be populated once the user connects their Supabase project
// through the Lovable Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types for our database tables
export type User = {
  id: string;
  email: string;
  created_at: string;
  user_type: 'patient' | 'doctor' | 'admin';
}

export type Patient = {
  id: string;
  user_id: string;
  full_name: string;
  date_of_birth: string;
  phone: string;
  address: string;
  created_at: string;
}

export type Doctor = {
  id: string;
  user_id: string;
  full_name: string;
  specialty_id: string;
  crm: string;
  bio: string;
  experience_years: number;
  phone: string;
  address: string;
  accepts_insurance: boolean;
  created_at: string;
}

export type Specialty = {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export type Appointment = {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  status: 'scheduled' | 'canceled' | 'completed';
  notes: string;
  created_at: string;
}
