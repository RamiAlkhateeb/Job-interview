import type { Course } from '../../courses'
import { L } from '../../helpers'

// Outline only: the chapters are planned and show as "Coming soon" until a module is written and given a
// loader (see the add-module skill).
export const economics: Course = {
  id: 'economics',
  category: 'business',
  audiences: ['job-seekers', 'professionals'],
  title: L('Introduction to Economics', 'مقدمة في الاقتصاد'),
  description: L(
    'The core ideas of micro- and macroeconomics: scarcity and choice, supply and demand, elasticity, market structures, GDP, inflation, unemployment and money.',
    'الأفكار الأساسية في الاقتصاد الجزئي والكلي: الندرة والاختيار، والعرض والطلب، والمرونة، وهياكل السوق، والناتج المحلي، والتضخم، والبطالة، والنقود.',
  ),
  audience: L(
    'Job seekers preparing for business roles and professionals who want to follow the economy behind the news.',
    'للباحثين عن عمل في مجالات الأعمال وللمهنيين الذين يريدون فهم الاقتصاد وراء الأخبار.',
  ),
  groups: [
    {
      label: L('Microeconomics', 'الاقتصاد الجزئي'),
      items: [
        { id: 'what', title: L('What economics studies', 'ماذا يدرس علم الاقتصاد') },
        { id: 'supply-demand', title: L('Supply & demand', 'العرض والطلب') },
        { id: 'elasticity', title: L('Elasticity', 'المرونة') },
        { id: 'markets', title: L('Market structures', 'هياكل السوق') },
      ],
    },
    {
      label: L('Macroeconomics', 'الاقتصاد الكلي'),
      items: [
        { id: 'macro', title: L('GDP, inflation & unemployment', 'الناتج المحلي والتضخم والبطالة') },
        { id: 'money', title: L('Money, banks & policy', 'النقود والبنوك والسياسة الاقتصادية') },
      ],
    },
  ],
  loaders: {},
}
