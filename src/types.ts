export interface User {
  id: string;
  email: string;
  password?: string;
}

export interface Member {
  id: string;
  nombre: string;
  cedula: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;
  bautizado: 'Sí' | 'No';
  activo: 'Sí' | 'No';
  fecha_registro: string;
}

export interface Evento {
  id: string;
  nombre: string;
  tipo: 'Bautismo' | 'Confirmación' | 'Boda' | 'Culto' | 'Reunión';
  fecha: string;
  estado: 'Realizado' | 'Pendiente' | 'Cancelado';
}

export interface Transaccion {
  id: string;
  concepto: string;
  categoria: 'Diezmo' | 'Ofrenda' | 'Donación' | 'Luz' | 'Agua' | 'Mantenimiento' | 'Compra';
  tipo: 'Ingreso' | 'Egreso';
  monto: number;
  fecha: string;
}

export interface InventarioItem {
  id: string;
  nombre_producto: string;
  categoria: 'Mobiliario' | 'Electrónica' | 'Libros' | 'Utensilios';
  cantidad: number;
  ministerio: string;
  estado: 'Bueno' | 'Regular' | 'Malo';
  fecha_adicion: string;
}
