export const STAT_CONFIG = {
  budget: {
    icon: '💰',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    trendColor: 'text-emerald-500',
  },
  executed: {
    icon: '📈',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    trendColor: 'text-emerald-500',
  },
  available: {
    icon: '🪙',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    trendColor: 'text-amber-500',
  },
  alerts: {
    icon: '⚠️',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    trendColor: 'text-rose-500',
  },
} as const;

export type StatType = keyof typeof STAT_CONFIG;
