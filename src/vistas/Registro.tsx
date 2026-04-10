import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAutenticacion';
import { UserPlus, Lock, Mail, ShieldCheck } from 'lucide-react';

const Registro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return '';
    if (pass.length < 6) return 'Débil';
    if (pass.length < 10) return 'Media';
    return 'Fuerte';
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    register(email, password);
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        <div className="bg-blue-800 p-8 text-white text-center">
          <h1 className="text-3xl font-bold">Crear Cuenta</h1>
          <p className="text-blue-200 mt-2">Únete al sistema de gestión</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 block">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 block">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {password && (
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      strength === 'Débil' ? 'w-1/3 bg-red-500' : 
                      strength === 'Media' ? 'w-2/3 bg-yellow-500' : 'w-full bg-green-500'
                    }`}
                  />
                </div>
                <span className={`text-[10px] font-bold uppercase ${
                  strength === 'Débil' ? 'text-red-500' : 
                  strength === 'Media' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {strength}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 block">Confirmar Contraseña</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg mt-4"
          >
            <UserPlus size={20} />
            <span>Registrarse</span>
          </button>

          <div className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-700 font-bold hover:underline">
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
