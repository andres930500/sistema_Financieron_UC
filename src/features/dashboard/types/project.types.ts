export interface Project {
  id: number;
  nombre: string;
  valor: string;
  estado: 'Recibido' | 'Pendiente' | 'En Proceso';
  fecha: string;
}
