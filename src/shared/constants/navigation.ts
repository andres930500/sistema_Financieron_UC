export interface MenuItem {
  label: string;
  icon: string;
  path: string; // Crucial para la navegación real
  active?: boolean;
}

export const SECRETARY_MENU: MenuItem[] = [
  {
    label: 'Resumen Global',
    icon: '📊',
    path: '/dashboard',
    active: true,
  },
  {
    label: 'Gestión de Ingresos',
    icon: '📈',
    path: '/dashboard/ingresos',
    active: false,
  },
  {
    label: 'Gastos y Ejecución',
    icon: '💰',
    path: '/dashboard/gastos',
    active: false,
  },
  {
    label: 'Nómina',
    icon: '👥',
    path: '/dashboard/nomina',
    active: false,
  },
  {
    label: 'Normatividad BPMN',
    icon: '📋',
    path: '/dashboard/bpmn', // Vinculado a tus estudios de BPMN
    active: false,
  },
  {
    label: 'Auditoría Reforzada',
    icon: '🛡️',
    path: '/dashboard/auditoria',
    active: false,
  },
];
