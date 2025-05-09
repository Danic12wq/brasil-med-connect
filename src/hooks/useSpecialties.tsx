
import { useQuery } from '@tanstack/react-query';
import { supabase, Specialty } from '@/lib/supabase';

export const useSpecialties = () => {
  const fetchSpecialties = async () => {
    const { data, error } = await supabase
      .from('specialties')
      .select('*')
      .order('name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  };
  
  const { 
    data: specialties = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['specialties'],
    queryFn: fetchSpecialties
  });
  
  return { specialties, isLoading, isError, error };
};
