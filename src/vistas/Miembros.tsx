import React, { useState } from 'react';
import { useData } from '../hooks/useDatos';
import { generatePDF } from '../services/pdf';
import { 
  Plus, Search, FileText, Edit2, Trash2, X, Check,
  UserPlus, UserCheck, UserMinus
} from 'lucide-react';
import { Member } from '../types';

const Miembros: React.FC = () => {
  const { members, addMember, updateMember, deleteMember } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Member, 'id'>>({
    nombre: '',
    cedula: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    bautizado: 'No',
    activo: 'Sí',
    fecha_registro: new Date().toISOString().split('T')[0]
  });

  const filteredMembers = members.filter(m => 
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.cedula.includes(searchTerm)
  );

  const handleOpenModal = (member?: Member) => {
    if (member) {
      setEditingMember(member);
      setFormData({ ...member });
    } else {
      setEditingMember(null);
      setFormData({
        nombre: '',
        cedula: '',
        telefono: '',
        direccion: '',
        fecha_nacimiento: '',
        bautizado: 'No',
        activo: 'Sí',
        fecha_registro: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMember(editingMember.id, formData);
    } else {
      addMember(formData);
    }
    setIsModalOpen(false);
  };

  const handleExportPDF = () => {
    const headers = [['ID', 'Nombre', 'Cédula', 'Teléfono', 'Bautizado', 'Activo', 'Registro']];
    const data = filteredMembers.map(m => [
      m.id, m.nombre, m.cedula, m.telefono, m.bautizado, m.activo, m.fecha_registro
    ]);
    generatePDF('Reporte de Miembros - Iglesia Filadelfia', headers, data, 'miembros');
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Miembros</h1>
          <p className="text-gray-500">Administración de la congregación</p>
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
            <span>Nuevo Miembro</span>
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre o cédula..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cédula</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Bautizado</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{member.nombre}</div>
                    <div className="text-xs text-gray-400">{member.direccion}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.cedula}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.telefono}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      member.bautizado === 'Sí' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {member.bautizado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      member.activo === 'Sí' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {member.activo === 'Sí' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenModal(member)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        if(confirm('¿Estás seguro de desactivar este miembro?')) {
                          deleteMember(member.id);
                        }
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
        {filteredMembers.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No se encontraron miembros con esos criterios.
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-800 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingMember ? 'Editar Miembro' : 'Nuevo Miembro'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-blue-700 p-1 rounded-full">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Nombre Completo</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Cédula de Identidad</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.cedula}
                  onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Teléfono</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Fecha de Nacimiento</label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.fecha_nacimiento}
                  onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-bold text-gray-700">Dirección</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">¿Bautizado?</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.bautizado}
                  onChange={(e) => setFormData({ ...formData, bautizado: e.target.value as 'Sí' | 'No' })}
                >
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Estado</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.value as 'Sí' | 'No' })}
                >
                  <option value="Sí">Activo</option>
                  <option value="No">Inactivo</option>
                </select>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
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
                  {editingMember ? 'Guardar Cambios' : 'Registrar Miembro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Miembros;
