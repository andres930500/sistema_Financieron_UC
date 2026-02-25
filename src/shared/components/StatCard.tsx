import React from 'react';
import { STAT_CONFIG, StatType } from '@shared/constants/stats.constants';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  percentage?: string;
  isCritical?: boolean;
  type?: StatType;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  percentage,
  isCritical = false,
  type = 'budget',
}) => {
  const { icon, color, bg, trendColor } = STAT_CONFIG[type];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>

        {!isCritical && trend && (
          <span
            className={`text-[10px] font-bold ${trendColor} flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100`}
          >
            {type === 'available' ? '▼' : '▲'} {trend.split(' ')[0]}
          </span>
        )}
      </div>

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>

        {percentage && (
          <div className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-1.5 bg-emerald-50/50 w-fit px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {percentage}
          </div>
        )}

        {trend && !percentage && (
          <p
            className={`text-[10px] font-semibold ${isCritical ? 'text-rose-500 animate-bounce' : 'text-slate-400'} mt-2 italic`}
          >
            {isCritical ? `🚨 ${trend}` : trend}
          </p>
        )}
      </div>
    </div>
  );
};
