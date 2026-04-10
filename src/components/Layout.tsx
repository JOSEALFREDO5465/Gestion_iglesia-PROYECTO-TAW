import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAutenticacion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Wallet, 
  Package, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Miembros', path: '/miembros', icon: Users },
    { name: 'Eventos', path: '/eventos', icon: Calendar },
    { name: 'Finanzas', path: '/finanzas', icon: Wallet },
    { name: 'Inventario', path: '/inventario', icon: Package },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-blue-800 text-white shadow-xl">
        <div className="p-6 text-center border-b border-blue-700">
          <h1 className="text-2xl font-bold tracking-tight">Iglesia Filadelfia</h1>
          <p className="text-xs text-blue-300 mt-1">Gestión Administrativa</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
              {user.email[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-blue-300">Administrador</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition-colors text-red-100"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-blue-800 text-white p-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold">Filadelfia</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-blue-900 text-white flex flex-col p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Menú</h1>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 space-y-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-4 p-4 text-lg border-b border-blue-800"
                >
                  <Icon size={24} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center space-x-4 p-4 text-lg text-red-400"
          >
            <LogOut size={24} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
