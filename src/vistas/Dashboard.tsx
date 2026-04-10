import React from 'react';
import { useData } from '../hooks/useDatos';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { Users, TrendingUp, TrendingDown, Scale, Calendar, Package } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { members, events, transactions, inventory } = useData();

  const activeMembers = members.filter(m => m.activo === 'Sí').length;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter(t => {
    const d = new Date(t.fecha);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyTransactions
    .filter(t => t.tipo === 'Ingreso')
    .reduce((acc, t) => acc + t.monto, 0);

  const monthlyExpense = monthlyTransactions
    .filter(t => t.tipo === 'Egreso')
    .reduce((acc, t) => acc + t.monto, 0);

  const totalBalance = transactions
    .reduce((acc, t) => acc + (t.tipo === 'Ingreso' ? t.monto : -t.monto), 0);

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const chartData = months.map((m, i) => {
    const monthTransactions = transactions.filter(t => new Date(t.fecha).getMonth() === i);
    return {
      name: m,
      Ingresos: monthTransactions.filter(t => t.tipo === 'Ingreso').reduce((acc, t) => acc + t.monto, 0),
      Egresos: monthTransactions.filter(t => t.tipo === 'Egreso').reduce((acc, t) => acc + t.monto, 0),
    };
  });

  const bautizadosCount = members.filter(m => m.bautizado === 'Sí').length;
  const noBautizadosCount = members.length - bautizadosCount;
  const pieData = [
    { name: 'Bautizados', value: bautizadosCount },
    { name: 'No Bautizados', value: noBautizadosCount },
  ];
  const COLORS = ['#1e40af', '#93c5fd'];

  const recentMembers = [...members].sort((a, b) => b.fecha_registro.localeCompare(a.fecha_registro)).slice(0, 5);
  const upcomingEvents = events
    .filter(e => new Date(e.fecha) >= new Date())
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .slice(0, 5);
  const recentInventory = [...inventory].sort((a, b) => b.fecha_adicion.localeCompare(a.fecha_adicion)).slice(0, 5);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>
        <p className="text-gray-500">Resumen general de la Iglesia Filadelfia</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Miembros Activos" 
          value={activeMembers} 
          icon={<Users className="text-blue-600" />} 
          color="bg-blue-50"
        />
        <StatCard 
          title="Ingresos Mes" 
          value={`${monthlyIncome} bs`} 
          icon={<TrendingUp className="text-green-600" />} 
          color="bg-green-50"
        />
        <StatCard 
          title="Egresos Mes" 
          value={`${monthlyExpense} bs`} 
          icon={<TrendingDown className="text-red-600" />} 
          color="bg-red-50"
        />
        <StatCard 
          title="Balance Total" 
          value={`${totalBalance} bs`} 
          icon={<Scale className="text-purple-600" />} 
          color="bg-purple-50"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Ingresos vs Egresos (Anual)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Ingresos" fill="#1e40af" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Egresos" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Estado de Bautismo</h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ListCard 
          title="Últimos Miembros" 
          icon={<Users size={18} />}
          items={recentMembers.map(m => ({ id: m.id, primary: m.nombre, secondary: `CI: ${m.cedula}` }))}
        />
        <ListCard 
          title="Próximos Eventos" 
          icon={<Calendar size={18} />}
          items={upcomingEvents.map(e => ({ id: e.id, primary: e.nombre, secondary: e.fecha }))}
        />
        <ListCard 
          title="Inventario Reciente" 
          icon={<Package size={18} />}
          items={recentInventory.map(i => ({ id: i.id, primary: i.nombre_producto, secondary: `Cant: ${i.cantidad}` }))}
        />
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
    <div className={`p-3 rounded-lg ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ListCard: React.FC<{ title: string; icon: React.ReactNode; items: { id: string; primary: string; secondary: string }[] }> = ({ title, icon, items }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-4 border-b border-gray-100 flex items-center space-x-2 bg-gray-50">
      {icon}
      <h3 className="font-bold text-gray-700">{title}</h3>
    </div>
    <div className="divide-y divide-gray-50">
      {items.length > 0 ? items.map(item => (
        <div key={item.id} className="p-3 hover:bg-gray-50 transition-colors">
          <p className="text-sm font-semibold text-gray-800">{item.primary}</p>
          <p className="text-xs text-gray-500">{item.secondary}</p>
        </div>
      )) : (
        <p className="p-4 text-sm text-gray-400 text-center">No hay datos recientes</p>
      )}
    </div>
  </div>
);

export default Dashboard;
