
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-medical-500 text-white p-1.5 rounded-md">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <path d="M3 10h18"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M8 14h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 18h.01"></path>
                  <path d="M12 18h.01"></path>
                  <path d="M16 18h.01"></path>
                </svg>
              </div>
              <span className="font-bold text-lg">AgendarBrasil</span>
            </div>
            <p className="text-gray-400 mb-4">
              A plataforma que conecta pacientes e médicos, facilitando o agendamento de consultas em todo o Brasil.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="bg-gray-800 hover:bg-medical-500 transition-colors p-2 rounded-full"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div className="animate-fade-in [animation-delay:100ms]">
            <h3 className="font-semibold text-lg mb-4">Pacientes</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-medical-400 transition-colors">Como funciona</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Buscar médicos</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Especialidades</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Planos de saúde</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">App móvel</a></li>
            </ul>
          </div>
          
          <div className="animate-fade-in [animation-delay:200ms]">
            <h3 className="font-semibold text-lg mb-4">Médicos</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-medical-400 transition-colors">Cadastre-se</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Gestão de agenda</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Benefícios</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Suporte ao médico</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Portal do médico</a></li>
            </ul>
          </div>
          
          <div className="animate-fade-in [animation-delay:300ms]">
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-medical-400 transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">Imprensa</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">LGPD</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; 2025 AgendarBrasil. Todos os direitos reservados.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-medical-400 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-medical-400 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-medical-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
