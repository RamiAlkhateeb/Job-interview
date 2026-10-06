import type { Course } from '../../courses'
import { L } from '../../helpers'

export const entrepreneurship: Course = {
  id: 'entrepreneurship',
  category: 'business',
  title: L('Entrepreneurship', 'ريادة الأعمال'),
  description: L(
    'From idea to a business that works: validating the idea, business models, pricing, unit economics and funding.',
    'من الفكرة إلى عمل ناجح: التحقق من الفكرة، ونماذج الأعمال، والتسعير، واقتصاديات الوحدة، والتمويل.',
  ),
  groups: [
    {
      label: L('Find the idea', 'إيجاد الفكرة'),
      items: [
        { id: 'validation', title: L('Validating a business idea', 'التحقق من فكرة العمل') },
        { id: 'business-model', title: L('Business models & the lean canvas', 'نماذج الأعمال ومخطط Lean Canvas') },
      ],
    },
    {
      label: L('Make it work', 'اجعله ينجح'),
      items: [
        { id: 'pricing', title: L('Pricing', 'التسعير') },
        { id: 'unit-economics', title: L('Unit economics', 'اقتصاديات الوحدة') },
        { id: 'funding', title: L('Funding your business', 'تمويل عملك') },
        { id: 'legal', title: L('Legal & admin basics', 'أساسيات القانون والإدارة') },
      ],
    },
  ],
  loaders: {
    validation: () => import('./validation').then((m) => m.validation),
  },
}
