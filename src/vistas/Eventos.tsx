import React, { useState } from 'react';
import { useData } from '../hooks/useDatos';
import { generatePDF } from '../services/pdf';
import { 
  Plus, FileText, Edit2, Trash2, X, Calendar as CalendarIcon,
  Clock, CheckCircle, AlertTriangle, XCircle
} from 'lucide-react';
import { Evento } from '../types';

const Eventos: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Evento | null>(null);

  const [formData, setFormData] = useState<Omit<Evento, 'id'>>({
    nombre: '',
    tipo: 'Culto',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente'
  });

  const handleOpenModal = (event?: Evento) => {
    if (event) {
      setEditingEvent(event);
      setFormData({ ...event });
    } else {
      setEditingEvent(null);
      setFormData({
        nombre: '',
        tipo: 'Culto',
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pendiente'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
    } else {
      addEvent(formData);
    }
    setIsModalOpen(false);
  };

  const handleExportPDF = () => {
    const headers = [['ID', 'Nombre', 'Tipo', 'Fecha', 'Estado']];
    const data = events.map(e => [e.id, e.nombre, e.tipo, e.fecha, e.estado]);
    generatePDF('Reporte de Eventos - Iglesia Filadelfia', headers, data, 'eventos');
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'Realizado': return <CheckCircle className="text-green-500" size={16} />;
      case 'Pendiente': return <Clock className="text-blue-500" size={16} />;
      case 'Cancelado': return <XCircle className="text-red-500" size={16} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Eventos y Actividades</h1>
          <p className="text-gray-500">Cronograma de la iglesia</p>
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
            <span>Nueva Actividad</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.sort((a, b) => b.fecha.localeCompare(a.fecha)).map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-2 ${
              event.tipo === 'Bautismo' ? 'bg-blue-500' :
              event.tipo === 'Boda' ? 'bg-pink-500' :
              event.tipo === 'Culto' ? 'bg-purple-500' : 'bg-gray-500'
            }`} />
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">{event.tipo}</span>
                  <h3 className="text-lg font-bold text-gray-800">{event.nombre}</h3>
                </div>
                <div className="flex space-x-1">
                  <button onClick={() => handleOpenModal(event)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => {
                    if(confirm('¿Cancelar este evento?')) deleteEvent(event.id);
                  }} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 space-x-2">
                  <CalendarIcon size={16} className="text-gray-400" />
                  <span>{event.fecha}</span>
                </div>
                <div className="flex items-center text-sm space-x-2">
                  {getStatusIcon(event.estado)}
                  <span className={`font-semibold ${
                    event.estado === 'Realizado' ? 'text-green-600' :
                    event.estado === 'Pendiente' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {event.estado}
                  </span>
                </div>
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
                {editingEvent ? 'Editar Actividad' : 'Nueva Actividad'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-blue-700 p-1 rounded-full">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Nombre del Evento</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Tipo de Evento</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                >
                  <option value="Bautismo">Bautismo</option>
                  <option value="Confirmación">Confirmación</option>
                  <option value="Boda">Boda</option>
                  <option value="Culto">Culto</option>
                  <option value="Reunión">Reunión</option>
                </select>
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
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Estado</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Realizado">Realizado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
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
                  {editingEvent ? 'Guardar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos;
