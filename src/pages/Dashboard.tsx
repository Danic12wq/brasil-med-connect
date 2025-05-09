
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Bem-vindo, {user?.email}!</h1>
          
          {user?.user_type === 'patient' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h2 className="text-xl font-medium mb-4">Minhas Consultas</h2>
                <p className="text-gray-600">Você não tem consultas agendadas.</p>
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                  Agendar Consulta
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h2 className="text-xl font-medium mb-4">Médicos Favoritos</h2>
                <p className="text-gray-600">Você ainda não adicionou médicos aos favoritos.</p>
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                  Buscar Médicos
                </button>
              </div>
            </div>
          )}
          
          {user?.user_type === 'doctor' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h2 className="text-xl font-medium mb-4">Consultas Hoje</h2>
                <p className="text-gray-600">Você não tem consultas agendadas para hoje.</p>
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                  Ver Agenda Completa
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h2 className="text-xl font-medium mb-4">Perfil Profissional</h2>
                <p className="text-gray-600">Complete seu perfil para ser encontrado por pacientes.</p>
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                  Completar Perfil
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
