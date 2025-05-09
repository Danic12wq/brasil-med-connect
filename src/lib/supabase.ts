
import { createClient } from '@supabase/supabase-js';

// Check for required Supabase connection details
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Show informative error if Supabase is not connected
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(`
    ⚠️ Supabase connection details missing!
    
    You must connect this Lovable project to Supabase:
    1. Click the green Supabase button at the top right of the interface
    2. Follow the steps to connect to your Supabase project
    
    This will automatically set up the required environment variables.
  `);
}

// Create the Supabase client with available connection details
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

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
