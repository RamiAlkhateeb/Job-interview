import type { Course } from '../../courses'
import { L } from '../../helpers'

export const marketing: Course = {
  id: 'marketing',
  category: 'business',
  title: L('Marketing Fundamentals', 'أساسيات التسويق'),
  description: L(
    'Find the right customers and win them: segmentation and positioning, the marketing mix, the funnel, metrics, digital channels and sales.',
    'اعثر على العملاء المناسبين واكسبهم: التجزئة والتموضع، والمزيج التسويقي، ومسار التحويل، والمقاييس، والقنوات الرقمية، والمبيعات.',
  ),
  audience: L(
    'Founders, students and career-switchers who want the core ideas of marketing in plain language.',
    'لروّاد الأعمال والطلاب ومن يغيّرون مسارهم المهني ويريدون أفكار التسويق الأساسية بلغة بسيطة.',
  ),
  groups: [
    {
      label: L('Foundations', 'الأساسيات'),
      items: [
        { id: 'fundamentals', title: L('Customers, positioning & the funnel', 'العملاء والتموضع ومسار التحويل') },
        { id: 'branding', title: L('Brand building', 'بناء العلامة التجارية') },
      ],
    },
    {
      label: L('Channels', 'القنوات'),
      items: [
        { id: 'digital', title: L('Digital marketing channels', 'قنوات التسويق الرقمي') },
        { id: 'content-seo', title: L('Content & SEO', 'المحتوى وتحسين محركات البحث') },
        { id: 'sales', title: L('Sales basics', 'أساسيات المبيعات') },
      ],
    },
  ],
  loaders: {
    fundamentals: () => import('./fundamentals').then((m) => m.fundamentals),
  },
}
