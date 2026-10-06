import type { Course } from '../../courses'
import { L } from '../../helpers'

export const personalFinance: Course = {
  id: 'personal-finance',
  category: 'business',
  title: L('Personal Finance', 'التمويل الشخصي'),
  description: L(
    'Take control of your own money: budgeting, an emergency fund, debt, credit and saving for big goals.',
    'تحكّم في أموالك: الميزانية، وصندوق الطوارئ، والديون، والائتمان، والادخار للأهداف الكبيرة.',
  ),
  notice: L(
    'Educational content only — not financial advice. Rules and products differ by country; check local rules or a licensed adviser before acting.',
    'محتوى تعليمي فقط — وليس نصيحة مالية. تختلف القواعد والمنتجات من بلد لآخر؛ تحقّق من القواعد المحلية أو استشر مستشارًا مرخّصًا قبل التصرف.',
  ),
  groups: [
    {
      label: L('Money basics', 'أساسيات المال'),
      items: [
        { id: 'budgeting', title: L('Budgeting & emergency fund', 'الميزانية وصندوق الطوارئ') },
        { id: 'debt', title: L('Managing debt', 'إدارة الديون') },
        { id: 'credit', title: L('Credit scores & borrowing', 'التصنيف الائتماني والاقتراض') },
      ],
    },
    {
      label: L('Protect and grow', 'الحماية والنمو'),
      items: [
        { id: 'insurance', title: L('Insurance basics', 'أساسيات التأمين') },
        { id: 'goals', title: L('Saving for big goals', 'الادخار للأهداف الكبيرة') },
      ],
    },
  ],
  loaders: {
    budgeting: () => import('./budgeting').then((m) => m.budgeting),
  },
}
