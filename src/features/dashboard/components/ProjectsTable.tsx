import React from 'react';
import { Project } from '@features/dashboard/types/project.types';

// Movimos los datos fuera del componente para simular una respuesta de API
const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    nombre: 'Transferencia MinEducación - Ley 30',
    valor: '$1.250.000.000',
    estado: 'Recibido',
    fecha: '15/02/2026',
  },
  {
    id: 2,
    nombre: 'Estampilla Pro-Universidad',
    valor: '$450.000.000',
    estado: 'Pendiente',
    fecha: '18/02/2026',
  },
  {
    id: 3,
    nombre: 'Recursos Propios - Posgrados',
    valor: '$320.000.000',
    estado: 'Recibido',
    fecha: '10/02/2026',
  },
];

export const ProjectsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
            <th className="px-6 py-3">Proyecto / Origen</th>
            <th className="px-6 py-3">Valor Asignado</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3 text-right">Último Movimiento</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_PROJECTS.map((proj) => (
            <tr
              key={proj.id}
              className="bg-white hover:bg-slate-50 transition-all group cursor-pointer shadow-sm hover:shadow-md"
            >
              <td className="px-6 py-4 rounded-l-2xl border-y border-l border-slate-100">
                <p className="text-sm font-bold text-slate-700 group-hover:text-blue-900 transition-colors">
                  {proj.nombre}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  ID: {proj.id.toString().padStart(4, '0')}
                </p>
              </td>
              <td className="px-6 py-4 border-y border-slate-100">
                <span className="text-sm font-black text-slate-700">{proj.valor}</span>
              </td>
              <td className="px-6 py-4 border-y border-slate-100">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold inline-block w-20 text-center ${
                    proj.estado === 'Recibido'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}
                >
                  {proj.estado}
                </span>
              </td>
              <td className="px-6 py-4 rounded-r-2xl border-y border-r border-slate-100 text-sm text-slate-500 font-medium text-right">
                {proj.fecha}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
