import type { Course } from '../../courses'
import { L } from '../../helpers'

// Outline only: the chapters are planned and show as "Coming soon" until a module is written and given a
// loader (see the add-module skill).
export const financialManagement: Course = {
  id: 'financial-management',
  category: 'business',
  audiences: ['entrepreneurs', 'professionals'],
  title: L('Financial Management & Feasibility Study', 'الإدارة المالية ودراسة الجدوى'),
  description: L(
    'Manage a firm’s money and judge new projects: time value of money, capital budgeting, cost of capital, working capital, and how to write a feasibility study.',
    'أدِر أموال المنشأة وقيّم المشروعات الجديدة: القيمة الزمنية للنقود، والموازنة الرأسمالية، وتكلفة رأس المال، ورأس المال العامل، وكيفية إعداد دراسة جدوى.',
  ),
  audience: L(
    'Founders planning a project and professionals who evaluate investments or manage a budget.',
    'لروّاد الأعمال الذين يخططون لمشروع وللمهنيين الذين يقيّمون الاستثمارات أو يديرون الموازنات.',
  ),
  groups: [
    {
      label: L('Financial management', 'الإدارة المالية'),
      items: [
        { id: 'goals', title: L('Goals of financial management', 'أهداف الإدارة المالية') },
        { id: 'tvm', title: L('Time value of money', 'القيمة الزمنية للنقود') },
        { id: 'capital-budgeting', title: L('Capital budgeting (NPV, IRR, payback)', 'الموازنة الرأسمالية (صافي القيمة الحالية، معدل العائد الداخلي، فترة الاسترداد)') },
      ],
    },
    {
      label: L('Projects', 'المشروعات'),
      items: [
        { id: 'cost-of-capital', title: L('Cost of capital', 'تكلفة رأس المال') },
        { id: 'working-capital', title: L('Working capital management', 'إدارة رأس المال العامل') },
        { id: 'feasibility', title: L('Writing a feasibility study', 'إعداد دراسة الجدوى') },
      ],
    },
  ],
  loaders: {},
}
