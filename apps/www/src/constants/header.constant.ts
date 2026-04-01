import { FileSpreadsheet, Receipt } from 'lucide-react';

export const BLOCKS = [
  {
    icon: Receipt,
    name: 'Invoices',
    description: '6 pre-designed invoice layouts. Copy, paste, and customize.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    isDisabled: false,
    path: '/blocks/invoices',
    count: 6,
  },
  {
    icon: FileSpreadsheet,
    name: 'Reports',
    description: '4 production-ready report designs for various business needs.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    isDisabled: false,
    path: '/blocks/reports',
    count: 4,
  },
];
