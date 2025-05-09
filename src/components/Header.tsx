
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, UserPlus, LogOut, Menu } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="bg-medical-500 text-white p-1.5 rounded-md">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6"
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
          <span className="font-bold text-xl text-gray-800">AgendarBrasil</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-700 hover:text-medical-600 font-medium">Início</a>
          <a href="#features" className="text-gray-700 hover:text-medical-600 font-medium">Como funciona</a>
          <a href="#for-doctors" className="text-gray-700 hover:text-medical-600 font-medium">Para médicos</a>
          <a href="#contact" className="text-gray-700 hover:text-medical-600 font-medium">Contato</a>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => navigate(user?.user_type === 'patient' ? '/dashboard' : '/doctor/dashboard')}
              >
                <User className="mr-2 h-4 w-4" />
                Minha Conta
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="flex items-center"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => navigate('/login')}
              >
                <User className="mr-2 h-4 w-4" />
                Entrar
              </Button>
              <Button 
                size="sm" 
                className="bg-medical-500 hover:bg-medical-600 flex items-center"
                onClick={() => navigate('/register')}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Cadastre-se
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white border-t animate-fade-in">
          <nav className="flex flex-col space-y-3">
            <a href="/" className="text-gray-700 hover:text-medical-600 py-2 font-medium">Início</a>
            <a href="#features" className="text-gray-700 hover:text-medical-600 py-2 font-medium">Como funciona</a>
            <a href="#for-doctors" className="text-gray-700 hover:text-medical-600 py-2 font-medium">Para médicos</a>
            <a href="#contact" className="text-gray-700 hover:text-medical-600 py-2 font-medium">Contato</a>
          </nav>
          <div className="flex flex-col space-y-2 mt-4">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center justify-center"
                  onClick={() => navigate(user?.user_type === 'patient' ? '/dashboard' : '/doctor/dashboard')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Minha Conta
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="flex items-center justify-center"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center justify-center"
                  onClick={() => navigate('/login')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
                <Button 
                  size="sm" 
                  className="bg-medical-500 hover:bg-medical-600 flex items-center justify-center"
                  onClick={() => navigate('/register')}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Cadastre-se
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
