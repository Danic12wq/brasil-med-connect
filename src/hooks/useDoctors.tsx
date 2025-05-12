
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useState, useCallback } from 'react';

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

export type DoctorWithSpecialty = Doctor & {
  specialty: Specialty | null;
};

interface UseDoctorsProps {
  initialSpecialty?: string;
  searchTerm?: string;
  location?: string;
}

export const useDoctors = ({ 
  initialSpecialty = '',
  searchTerm = '',
  location = ''
}: UseDoctorsProps = {}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    initialSpecialty ? [initialSpecialty] : []
  );
  const [search, setSearch] = useState(searchTerm);
  const [locationFilter, setLocationFilter] = useState(location);
  
  const itemsPerPage = 5;
  
  // Fetch doctors with their specialties
  const fetchDoctors = useCallback(async () => {
    let query = supabase
      .from('doctors')
      .select(`
        *,
        specialty:specialty_id (id, name, icon, description)
      `);
    
    // Apply specialty filter if any are selected
    if (selectedSpecialties.length > 0) {
      query = query.in('specialty_id', selectedSpecialties);
    }
    
    // Apply search term filter
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,bio.ilike.%${search}%`);
    }
    
    // Apply location filter
    if (locationFilter) {
      query = query.ilike('address', `%${locationFilter}%`);
    }
    
    // Add pagination
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    
    const { data, error, count } = await query
      .range(from, to)
      .order('created_at', { ascending: false })
      .returns<DoctorWithSpecialty[]>();
    
    if (error) {
      throw error;
    }
    
    // Also get total count for pagination
    const { count: totalCount } = await supabase
      .from('doctors')
      .select('id', { count: 'exact' });
    
    return { 
      doctors: data || [], 
      totalPages: Math.ceil((totalCount || 0) / itemsPerPage) 
    };
  }, [currentPage, selectedSpecialties, search, locationFilter, itemsPerPage]);
  
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    refetch
  } = useQuery({
    queryKey: ['doctors', currentPage, selectedSpecialties, search, locationFilter],
    queryFn: fetchDoctors
  });
  
  const toggleSpecialty = (specialtyId: string) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialtyId)) {
        return prev.filter(id => id !== specialtyId);
      } else {
        return [...prev, specialtyId];
      }
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  return {
    doctors: data?.doctors || [],
    totalPages: data?.totalPages || 0,
    currentPage,
    setCurrentPage,
    selectedSpecialties,
    toggleSpecialty,
    search,
    setSearch,
    locationFilter,
    setLocationFilter,
    isLoading,
    isError,
    error,
    refetch
  };
};
