import type { Course } from '../../courses'
import { L } from '../../helpers'

// Outline only: the chapters are planned and show as "Coming soon" until a module is written and given a
// loader (see the add-module skill).
export const costAccounting: Course = {
  id: 'cost-accounting',
  category: 'business',
  audiences: ['professionals', 'entrepreneurs'],
  title: L('Accounting and Cost Analysis', 'المحاسبة وتحليل التكاليف'),
  description: L(
    'Know what things really cost: cost behaviour, job and process costing, activity-based costing, cost-volume-profit, budgets and variances, and costs for decisions.',
    'اعرف التكلفة الحقيقية للأشياء: سلوك التكاليف، وتكاليف الأوامر والمراحل، والتكاليف على أساس الأنشطة، وتحليل التكلفة والحجم والربح، والموازنات والانحرافات، والتكاليف الملائمة للقرارات.',
  ),
  audience: L(
    'Managers and founders who price products, plan budgets or decide what to make, buy or drop.',
    'للمديرين وروّاد الأعمال الذين يسعّرون المنتجات أو يخططون الموازنات أو يقررون ما يُصنَّع أو يُشترى أو يُلغى.',
  ),
  groups: [
    {
      label: L('Costing', 'حساب التكاليف'),
      items: [
        { id: 'concepts', title: L('Cost concepts & behaviour', 'مفاهيم التكاليف وسلوكها') },
        { id: 'job-process', title: L('Job & process costing', 'تكاليف الأوامر والمراحل') },
        { id: 'abc', title: L('Activity-based costing', 'التكاليف على أساس الأنشطة') },
      ],
    },
    {
      label: L('Planning & decisions', 'التخطيط والقرارات'),
      items: [
        { id: 'cvp', title: L('Cost-volume-profit analysis', 'تحليل التكلفة والحجم والربح') },
        { id: 'budgeting', title: L('Budgeting & variance analysis', 'الموازنات وتحليل الانحرافات') },
        { id: 'relevant', title: L('Relevant costs for decisions', 'التكاليف الملائمة لاتخاذ القرار') },
      ],
    },
  ],
  loaders: {},
}
