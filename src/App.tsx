import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAutenticacion';
import Layout from './components/Layout';
import Dashboard from './vistas/Dashboard';
import Miembros from './vistas/Miembros';
import Eventos from './vistas/Eventos';
import Finanzas from './vistas/Finanzas';
import Inventario from './vistas/Inventario';
import Login from './vistas/Login';
import Registro from './vistas/Registro';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/miembros" element={<ProtectedRoute><Miembros /></ProtectedRoute>} />
          <Route path="/eventos" element={<ProtectedRoute><Eventos /></ProtectedRoute>} />
          <Route path="/finanzas" element={<ProtectedRoute><Finanzas /></ProtectedRoute>} />
          <Route path="/inventario" element={<ProtectedRoute><Inventario /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
