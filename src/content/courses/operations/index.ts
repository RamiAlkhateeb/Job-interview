import type { Course } from '../../courses'
import { L } from '../../helpers'

// Outline only: the chapters are planned and show as "Coming soon" until a module is written and given a
// loader (see the add-module skill).
export const operations: Course = {
  id: 'operations',
  category: 'management',
  audiences: ['professionals', 'job-seekers'],
  title: L('Operations and Supply Chain Management', 'إدارة العمليات وسلاسل الإمداد'),
  description: L(
    'How goods and services get made and delivered: process design, capacity, forecasting, inventory, supply chain design, quality and lean.',
    'كيف تُنتَج السلع والخدمات وتُسلَّم: تصميم العمليات، والطاقة الإنتاجية، والتنبؤ، والمخزون، وتصميم سلسلة الإمداد، والجودة والإنتاج الرشيق.',
  ),
  audience: L(
    'Professionals in operations, logistics or procurement, and job seekers heading into those roles.',
    'للعاملين في العمليات والخدمات اللوجستية والمشتريات، وللباحثين عن عمل في هذه المجالات.',
  ),
  groups: [
    {
      label: L('Operations', 'العمليات'),
      items: [
        { id: 'strategy', title: L('Operations strategy', 'استراتيجية العمليات') },
        { id: 'process', title: L('Process design & capacity', 'تصميم العمليات والطاقة الإنتاجية') },
        { id: 'forecasting', title: L('Forecasting demand', 'التنبؤ بالطلب') },
      ],
    },
    {
      label: L('Supply chain', 'سلسلة الإمداد'),
      items: [
        { id: 'inventory', title: L('Inventory management', 'إدارة المخزون') },
        { id: 'supply-chain', title: L('Supply chain design', 'تصميم سلسلة الإمداد') },
        { id: 'quality', title: L('Quality & lean operations', 'الجودة والعمليات الرشيقة') },
      ],
    },
  ],
  loaders: {},
}
