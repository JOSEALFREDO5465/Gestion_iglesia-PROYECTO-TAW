import { Member, Evento, Transaccion, InventarioItem } from '../types';

export const mockMembers: Member[] = [
  { id: '1', nombre: 'Juan Pérez', cedula: '1234567', telefono: '77712345', direccion: 'Av. Siempre Viva 123', fecha_nacimiento: '1990-05-15', bautizado: 'Sí', activo: 'Sí', fecha_registro: '2020-01-10' },
  { id: '2', nombre: 'María García', cedula: '2345678', telefono: '77723456', direccion: 'Calle Falsa 456', fecha_nacimiento: '1995-08-20', bautizado: 'Sí', activo: 'Sí', fecha_registro: '2021-03-15' },
  { id: '3', nombre: 'Carlos López', cedula: '3456789', telefono: '77734567', direccion: 'Calle 10 de Julio', fecha_nacimiento: '1985-12-05', bautizado: 'No', activo: 'Sí', fecha_registro: '2022-05-20' },
  { id: '4', nombre: 'Ana Martínez', cedula: '4567890', telefono: '77745678', direccion: 'Av. Blanco Galindo', fecha_nacimiento: '2000-02-28', bautizado: 'Sí', activo: 'No', fecha_registro: '2019-11-05' },
  { id: '5', nombre: 'Pedro Sánchez', cedula: '5678901', telefono: '77756789', direccion: 'Calle Sucre 789', fecha_nacimiento: '1970-06-10', bautizado: 'Sí', activo: 'Sí', fecha_registro: '2018-09-12' },
  { id: '6', nombre: 'Lucía Fernández', cedula: '6789012', telefono: '77767890', direccion: 'Av. Heroínas', fecha_nacimiento: '1992-04-14', bautizado: 'No', activo: 'Sí', fecha_registro: '2023-01-05' },
  { id: '7', nombre: 'Roberto Gómez', cedula: '7890123', telefono: '77778901', direccion: 'Calle Ayacucho', fecha_nacimiento: '1988-11-30', bautizado: 'Sí', activo: 'Sí', fecha_registro: '2021-07-22' },
  { id: '8', nombre: 'Elena Ruiz', cedula: '8901234', telefono: '77789012', direccion: 'Av. América', fecha_nacimiento: '1998-01-15', bautizado: 'No', activo: 'Sí', fecha_registro: '2023-02-10' },
  { id: '9', nombre: 'Mario Vargas', cedula: '9012345', telefono: '77790123', direccion: 'Calle Jordán', fecha_nacimiento: '1975-09-25', bautizado: 'Sí', activo: 'Sí', fecha_registro: '2017-05-30' },
  { id: '10', nombre: 'Sofía Castro', cedula: '0123456', telefono: '77701234', direccion: 'Av. Libertador', fecha_nacimiento: '2002-07-07', bautizado: 'No', activo: 'Sí', fecha_registro: '2023-06-15' },
  { id: '11', nombre: 'Luis Morales', cedula: '1122334', telefono: '77711223', direccion: 'Calle Aroma', fecha_nacimiento: '1980-03-12', bautizado: 'Sí', activo: 'Sí', fecha_registro: '2019-04-20' },
  { id: '12', nombre: 'Carmen Ortiz', cedula: '2233445', telefono: '77722334', direccion: 'Av. Circunvalación', fecha_nacimiento: '1994-10-05', bautizado: 'Sí', activo: 'No', fecha_registro: '2020-08-15' },
  { id: '13', nombre: 'Jorge Herrera', cedula: '3344556', telefono: '77733445', direccion: 'Calle Santiváñez', fecha_nacimiento: '1987-01-20', bautizado: 'No', activo: 'Sí', fecha_registro: '2022-11-30' },
  { id: '14', nombre: 'Beatriz Silva', cedula: '4455667', telefono: '77744556', direccion: 'Av. Oquendo', fecha_nacimiento: '1996-05-18', bautizado: 'Sí', activo: 'Sí', fecha_registro: '2021-12-05' },
  { id: '15', nombre: 'Andrés Rojas', cedula: '5566778', telefono: '77755667', direccion: 'Calle Lanza', fecha_nacimiento: '1991-09-09', bautizado: 'No', activo: 'Sí', fecha_registro: '2023-03-25' },
];

export const mockEvents: Evento[] = [
  { id: '1', nombre: "Bautismo General", tipo: "Bautismo", fecha: "2026-04-15", estado: "Realizado" },
  { id: '2', nombre: "Confirmación de Jóvenes", tipo: "Confirmación", fecha: "2026-05-10", estado: "Pendiente" },
  { id: '3', nombre: "Boda Comunitaria", tipo: "Boda", fecha: "2026-06-20", estado: "Pendiente" },
  { id: '4', nombre: "Culto Dominical", tipo: "Culto", fecha: "2026-04-12", estado: "Pendiente" },
  { id: '5', nombre: "Reunión de Líderes", tipo: "Reunión", fecha: "2026-04-11", estado: "Pendiente" },
  { id: '6', nombre: "Cena del Señor", tipo: "Culto", fecha: "2026-04-05", estado: "Realizado" },
  { id: '7', nombre: "Bautismo de Niños", tipo: "Bautismo", fecha: "2026-07-01", estado: "Pendiente" },
  { id: '8', nombre: "Reunión de Oración", tipo: "Reunión", fecha: "2026-04-09", estado: "Realizado" },
];

export const mockTransactions: Transaccion[] = [
  { id: '1', concepto: 'Diezmo Juan Pérez', categoria: 'Diezmo', tipo: 'Ingreso', monto: 500, fecha: '2026-04-01' },
  { id: '2', concepto: 'Ofrenda Culto Domingo', categoria: 'Ofrenda', tipo: 'Ingreso', monto: 1200, fecha: '2026-04-05' },
  { id: '3', concepto: 'Pago Luz Marzo', categoria: 'Luz', tipo: 'Egreso', monto: 350, fecha: '2026-04-02' },
  { id: '4', concepto: 'Donación Anónima', categoria: 'Donación', tipo: 'Ingreso', monto: 2000, fecha: '2026-04-03' },
  { id: '5', concepto: 'Compra Sillas Nuevas', categoria: 'Compra', tipo: 'Egreso', monto: 1500, fecha: '2026-04-04' },
  { id: '6', concepto: 'Mantenimiento Techo', categoria: 'Mantenimiento', tipo: 'Egreso', monto: 800, fecha: '2026-04-06' },
  { id: '7', concepto: 'Diezmo María García', categoria: 'Diezmo', tipo: 'Ingreso', monto: 450, fecha: '2026-04-07' },
  { id: '8', concepto: 'Pago Agua Marzo', categoria: 'Agua', tipo: 'Egreso', monto: 120, fecha: '2026-04-02' },
  { id: '9', concepto: 'Ofrenda Especial Misiones', categoria: 'Ofrenda', tipo: 'Ingreso', monto: 3000, fecha: '2026-04-08' },
  { id: '10', concepto: 'Compra Micrófonos', categoria: 'Compra', tipo: 'Egreso', monto: 1200, fecha: '2026-04-09' },
];

export const mockInventory: InventarioItem[] = [
  { id: '1', nombre_producto: 'Silla Plástica Blanca', categoria: 'Mobiliario', cantidad: 50, ministerio: 'General', estado: 'Bueno', fecha_adicion: '2025-10-10' },
  { id: '2', nombre_producto: 'Micrófono Inalámbrico', categoria: 'Electrónica', cantidad: 4, ministerio: 'Alabanza', estado: 'Bueno', fecha_adicion: '2026-01-15' },
  { id: '3', nombre_producto: 'Biblia Reina Valera', categoria: 'Libros', cantidad: 20, ministerio: 'Educación', estado: 'Bueno', fecha_adicion: '2025-12-01' },
  { id: '4', nombre_producto: 'Parlante JBL', categoria: 'Electrónica', cantidad: 2, ministerio: 'Alabanza', estado: 'Regular', fecha_adicion: '2024-05-20' },
  { id: '5', nombre_producto: 'Mesa de Madera', categoria: 'Mobiliario', cantidad: 5, ministerio: 'General', estado: 'Bueno', fecha_adicion: '2025-08-15' },
  { id: '6', nombre_producto: 'Proyector Epson', categoria: 'Electrónica', cantidad: 1, ministerio: 'Multimedia', estado: 'Malo', fecha_adicion: '2023-11-10' },
  { id: '7', nombre_producto: 'Guitarra Acústica', categoria: 'Electrónica', cantidad: 1, ministerio: 'Alabanza', estado: 'Bueno', fecha_adicion: '2026-03-05' },
  { id: '8', nombre_producto: 'Set de Vasos Santa Cena', categoria: 'Utensilios', cantidad: 100, ministerio: 'General', estado: 'Bueno', fecha_adicion: '2026-02-20' },
];
