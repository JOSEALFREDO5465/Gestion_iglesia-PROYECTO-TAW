import React, { useState } from 'react';
import { useData } from '../hooks/useDatos';
import { generatePDF } from '../services/pdf';
import { 
  Plus, FileText, Trash2, X, TrendingUp, TrendingDown, 
  DollarSign, Calendar as CalendarIcon, Filter
} from 'lucide-react';
import { Transaccion } from '../types';

const Finanzas: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'Todos' | 'Ingreso' | 'Egreso'>('Todos');

  const [formData, setFormData] = useState<Omit<Transaccion, 'id'>>({
    concepto: '',
    categoria: 'Diezmo',
    tipo: 'Ingreso',
    monto: 0,
    fecha: new Date().toISOString().split('T')[0]
  });

  const filteredTransactions = transactions.filter(t => 
    filterType === 'Todos' ? true : t.tipo === filterType
  ).sort((a, b) => b.fecha.localeCompare(a.fecha));

  const totalIncome = transactions.filter(t => t.tipo === 'Ingreso').reduce((acc, t) => acc + t.monto, 0);
  const totalExpense = transactions.filter(t => t.tipo === 'Egreso').reduce((acc, t) => acc + t.monto, 0);
  const balance = totalIncome - totalExpense;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction(formData);
    setIsModalOpen(false);
  };

  const handleExportPDF = () => {
    const headers = [['Fecha', 'Concepto', 'Categoría', 'Tipo', 'Monto (bs)']];
    const data = filteredTransactions.map(t => [t.fecha, t.concepto, t.categoria, t.tipo, t.monto]);
    generatePDF('Reporte Financiero - Iglesia Filadelfia', headers, data, 'finanzas');
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Finanzas</h1>
          <p className="text-gray-500">Control de ingresos y egresos</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium shadow-sm"
          >
            <FileText size={18} />
            <span>Reporte PDF</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-white font-medium shadow-md"
          >
            <Plus size={18} />
            <span>Nueva Transacción</span>
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-500 uppercase">Total Ingresos</span>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-green-600">{totalIncome} bs</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-500 uppercase">Total Egresos</span>
            <TrendingDown className="text-red-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-red-600">{totalExpense} bs</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-500 uppercase">Balance General</span>
            <DollarSign className="text-blue-500" size={20} />
          </div>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {balance} bs
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <span className="text-sm font-bold text-gray-600">Filtrar por:</span>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {(['Todos', 'Ingreso', 'Egreso'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  filterType === type ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Concepto</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Monto</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon size={14} className="text-gray-400" />
                      <span>{t.fecha}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{t.concepto}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase">
                      {t.categoria}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${
                    t.tipo === 'Ingreso' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {t.tipo === 'Ingreso' ? '+' : '-'}{t.monto} bs
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => {
                        if(confirm('¿Eliminar esta transacción?')) deleteTransaction(t.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No hay transacciones registradas.
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-800 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Nueva Transacción</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-blue-700 p-1 rounded-full">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {(['Ingreso', 'Egreso'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, tipo: type, categoria: type === 'Ingreso' ? 'Diezmo' : 'Luz' })}
                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                      formData.tipo === type 
                        ? (type === 'Ingreso' ? 'bg-green-600 text-white' : 'bg-red-600 text-white') 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Concepto</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej: Diezmo Juan Pérez"
                  value={formData.concepto}
                  onChange={(e) => setFormData({ ...formData, concepto: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Categoría</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value as any })}
                >
                  {formData.tipo === 'Ingreso' ? (
                    <>
                      <option value="Diezmo">Diezmo</option>
                      <option value="Ofrenda">Ofrenda</option>
                      <option value="Donación">Donación</option>
                    </>
                  ) : (
                    <>
                      <option value="Luz">Luz</option>
                      <option value="Agua">Agua</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Compra">Compra</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Monto (bs)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.monto}
                  onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Fecha</label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 text-white rounded-lg font-bold shadow-md ${
                    formData.tipo === 'Ingreso' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finanzas;
