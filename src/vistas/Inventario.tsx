import React, { useState } from 'react';
import { useData } from '../hooks/useDatos';
import { generatePDF } from '../services/pdf';
import { 
  Plus, FileText, Edit2, Trash2, X, Package, 
  Search, Shield, AlertCircle, CheckCircle2
} from 'lucide-react';
import { InventarioItem } from '../types';

const Inventario: React.FC = () => {
  const { inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventarioItem | null>(null);

  const [formData, setFormData] = useState<Omit<InventarioItem, 'id'>>({
    nombre_producto: '',
    categoria: 'Mobiliario',
    cantidad: 0,
    ministerio: '',
    estado: 'Bueno',
    fecha_adicion: new Date().toISOString().split('T')[0]
  });

  const filteredInventory = inventory.filter(i => 
    i.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.ministerio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (item?: InventarioItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({
        nombre_producto: '',
        categoria: 'Mobiliario',
        cantidad: 0,
        ministerio: '',
        estado: 'Bueno',
        fecha_adicion: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateInventoryItem(editingItem.id, formData);
    } else {
      addInventoryItem(formData);
    }
    setIsModalOpen(false);
  };

  const handleExportPDF = () => {
    const headers = [['Nombre', 'Categoría', 'Cant.', 'Ministerio', 'Estado']];
    const data = filteredInventory.map(i => [i.nombre_producto, i.categoria, i.cantidad, i.ministerio, i.estado]);
    generatePDF('Inventario de la Iglesia Filadelfia', headers, data, 'inventario');
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inventario</h1>
          <p className="text-gray-500">Control de activos y suministros</p>
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
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-white font-medium shadow-md"
          >
            <Plus size={18} />
            <span>Nuevo Artículo</span>
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre o ministerio..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredInventory.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Package size={20} />
              </div>
              <div className="flex space-x-1">
                <button onClick={() => handleOpenModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => {
                  if(confirm('¿Eliminar este artículo?')) deleteInventoryItem(item.id);
                }} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <h3 className="font-bold text-gray-800 mb-1">{item.nombre_producto}</h3>
            <p className="text-xs text-gray-400 mb-4 uppercase font-bold tracking-wider">{item.categoria}</p>
            
            <div className="mt-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cantidad:</span>
                <span className="font-bold text-gray-800">{item.cantidad}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Ministerio:</span>
                <span className="text-gray-700">{item.ministerio || 'General'}</span>
              </div>
              <div className="flex items-center space-x-1 pt-2 border-t border-gray-50">
                {item.estado === 'Bueno' ? <CheckCircle2 size={14} className="text-green-500" /> : 
                 item.estado === 'Regular' ? <AlertCircle size={14} className="text-yellow-500" /> : 
                 <Shield size={14} className="text-red-500" />}
                <span className={`text-xs font-bold ${
                  item.estado === 'Bueno' ? 'text-green-600' : 
                  item.estado === 'Regular' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  Estado: {item.estado}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-800 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingItem ? 'Editar Artículo' : 'Nuevo Artículo'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-blue-700 p-1 rounded-full">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.nombre_producto}
                  onChange={(e) => setFormData({ ...formData, nombre_producto: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Categoría</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value as any })}
                >
                  <option value="Mobiliario">Mobiliario</option>
                  <option value="Electrónica">Electrónica</option>
                  <option value="Libros">Libros</option>
                  <option value="Utensilios">Utensilios</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Cantidad</label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.cantidad}
                    onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Estado</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
                  >
                    <option value="Bueno">Bueno</option>
                    <option value="Regular">Regular</option>
                    <option value="Malo">Malo</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Ministerio</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej: Alabanza, Educación..."
                  value={formData.ministerio}
                  onChange={(e) => setFormData({ ...formData, ministerio: e.target.value })}
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
                  className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-bold shadow-md"
                >
                  {editingItem ? 'Guardar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventario;
