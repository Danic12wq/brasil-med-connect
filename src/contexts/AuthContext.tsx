
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase, User } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userType: 'patient' | 'doctor', fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for existing session on load
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          return;
        }

        if (data?.session) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single();

          if (userError) {
            console.error('Error fetching user:', userError);
          } else if (userData) {
            setUser(userData as User);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user:', error);
          } else if (userData) {
            setUser(userData as User);
            setIsAuthenticated(true);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Erro ao entrar",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo de volta!",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Erro ao entrar",
        description: "Ocorreu um erro ao tentar fazer login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userType: 'patient' | 'doctor', fullName: string) => {
    try {
      setLoading(true);
      
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            user_type: userType,
            full_name: fullName,
          }
        }
      });
      
      if (authError) {
        toast({
          title: "Erro ao cadastrar",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }
      
      if (!authData.user) {
        toast({
          title: "Erro ao cadastrar",
          description: "Não foi possível criar o usuário",
          variant: "destructive",
        });
        return;
      }

      // Create user record in users table
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: email,
          user_type: userType,
        });

      if (userError) {
        console.error('Error creating user record:', userError);
        toast({
          title: "Erro ao cadastrar",
          description: "Erro ao criar registro de usuário",
          variant: "destructive",
        });
        return;
      }

      // Create either patient or doctor record
      if (userType === 'patient') {
        const { error: patientError } = await supabase
          .from('patients')
          .insert({
            user_id: authData.user.id,
            full_name: fullName,
          });

        if (patientError) {
          console.error('Error creating patient record:', patientError);
          toast({
            title: "Erro ao cadastrar",
            description: "Erro ao criar registro de paciente",
            variant: "destructive",
          });
          return;
        }
      } else {
        // For doctor, we'll need more info later, but create basic record
        const { error: doctorError } = await supabase
          .from('doctors')
          .insert({
            user_id: authData.user.id,
            full_name: fullName,
          });

        if (doctorError) {
          console.error('Error creating doctor record:', doctorError);
          toast({
            title: "Erro ao cadastrar",
            description: "Erro ao criar registro de médico",
            variant: "destructive",
          });
          return;
        }
      }

      toast({
        title: "Cadastro bem-sucedido!",
        description: "Sua conta foi criada com sucesso.",
      });
      
      // Navigate based on user type
      if (userType === 'patient') {
        navigate('/dashboard');
      } else {
        navigate('/doctor/profile');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Erro ao cadastrar",
        description: "Ocorreu um erro ao tentar criar sua conta",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
      toast({
        title: "Sessão encerrada",
        description: "Você saiu da sua conta com sucesso",
      });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
