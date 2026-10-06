import type { Course } from '../../courses'
import { L } from '../../helpers'

export const accounting: Course = {
  id: 'accounting',
  category: 'business',
  title: L('Accounting Essentials', 'أساسيات المحاسبة'),
  description: L(
    'Read the numbers behind any business: the three financial statements, bookkeeping, key ratios and cash-flow management.',
    'اقرأ الأرقام وراء أي عمل: القوائم المالية الثلاث، ومسك الدفاتر، والنسب الأساسية، وإدارة التدفق النقدي.',
  ),
  groups: [
    {
      label: L('Foundations', 'الأساسيات'),
      items: [
        { id: 'statements', title: L('The three financial statements', 'القوائم المالية الثلاث') },
        { id: 'bookkeeping', title: L('Double-entry bookkeeping', 'القيد المزدوج ومسك الدفاتر') },
      ],
    },
    {
      label: L('Using the numbers', 'استخدام الأرقام'),
      items: [
        { id: 'ratios', title: L('Financial ratios', 'النسب المالية') },
        { id: 'cash-management', title: L('Managing cash flow', 'إدارة التدفق النقدي') },
      ],
    },
  ],
  loaders: {
    statements: () => import('./statements').then((m) => m.statements),
  },
}
