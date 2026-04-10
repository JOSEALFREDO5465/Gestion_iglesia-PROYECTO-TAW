import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAutenticacion';
import { LogIn, Lock, Mail, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Credenciales incorrectas. Intenta con admin@iglesia.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        <div className="bg-blue-800 p-8 text-white text-center">
          <h1 className="text-3xl font-bold">Bienvenido</h1>
          <p className="text-blue-200 mt-2">Sistema de Gestión Iglesia Filadelfia</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center space-x-2 text-sm border border-red-100">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg"
          >
            <LogIn size={20} />
            <span>Iniciar Sesión</span>
          </button>

          <div className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-blue-700 font-bold hover:underline">
              Regístrate aquí
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Demo: admin@iglesia.com / admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
