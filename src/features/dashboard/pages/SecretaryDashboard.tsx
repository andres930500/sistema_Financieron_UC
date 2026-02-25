import { useState } from 'react';
import { StatCard } from '@shared/components/StatCard';
import { ProjectsTable } from '../components/ProjectsTable'; // Importación relativa interna del módulo

export const SecretaryDashboard = () => {
  // Estado para el año fiscal, preparándonos para filtrar datos reales
  const [selectedYear, setSelectedYear] = useState('2026');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Encabezado Dinámico */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Panel de Control Total
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Vista general del sistema financiero — Universidad de Caldas
          </p>
        </div>

        {/* Selector de Año Estilizado */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-[#C5A059]">
          <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-tighter">
            Año Fiscal:
          </span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-sm font-bold text-slate-700 bg-slate-50 rounded-lg px-3 py-1.5 outline-none border-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      {/* Grid de Indicadores: Datos clave de María González */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Presupuesto Total"
          value="$3.020M"
          trend="+12.5% vs año anterior"
          type="budget"
        />
        <StatCard
          title="Ejecutado"
          value="$1.845M"
          percentage="61.1% de ejecución"
          type="executed"
        />
        <StatCard
          title="Disponible"
          value="$1.175M"
          percentage="38.9% remanente"
          type="available"
        />
        <StatCard
          title="Alertas Pendientes"
          value="7"
          trend="Requieren atención inmediata"
          isCritical={true}
          type="alerts"
        />
      </div>

      {/* Sección de la Tabla: Ingresos por Proyecto */}
      <section className="bg-white rounded-[2rem] p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 min-h-[400px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Ingresos Discriminados por Proyecto
            </h3>
            <p className="text-xs text-slate-400 mt-1">Desglose detallado de recursos asignados</p>
          </div>
          <button className="w-full sm:w-auto px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
            <span>📊</span> Exportar Reporte
          </button>
        </div>

        {/* Tabla de Proyectos Modular */}
        <div className="w-full">
          <ProjectsTable />
        </div>

        <footer className="mt-12 pt-6 border-t border-slate-50 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="italic text-[10px] font-medium uppercase tracking-widest">
              Sincronizado con API de .NET Core - Universidad de Caldas
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
};
