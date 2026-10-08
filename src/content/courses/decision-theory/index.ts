import type { Course } from '../../courses'
import { L } from '../../helpers'

// Outline only: the chapters are planned and show as "Coming soon" until a module is written and given a
// loader (see the add-module skill).
export const decisionTheory: Course = {
  id: 'decision-theory',
  category: 'management',
  audiences: ['professionals'],
  title: L('Decision Theory', 'نظرية القرار'),
  description: L(
    'Make better choices under uncertainty: payoff tables, decision criteria, expected value, decision trees, utility and the value of information.',
    'اتخذ قرارات أفضل في ظل عدم اليقين: جداول العوائد، ومعايير القرار، والقيمة المتوقعة، وأشجار القرار، والمنفعة، وقيمة المعلومات.',
  ),
  audience: L(
    'Managers and analysts who make or advise on decisions with incomplete information.',
    'للمديرين والمحللين الذين يتخذون قرارات أو يقدمون المشورة بشأنها في ظل معلومات ناقصة.',
  ),
  groups: [
    {
      label: L('Foundations', 'الأساسيات'),
      items: [
        { id: 'problems', title: L('Decision problems & payoff tables', 'مشكلات القرار وجداول العوائد') },
        { id: 'uncertainty', title: L('Decisions under uncertainty', 'القرارات في ظل عدم التأكد') },
        { id: 'risk', title: L('Decisions under risk & expected value', 'القرارات في ظل المخاطرة والقيمة المتوقعة') },
      ],
    },
    {
      label: L('Tools', 'الأدوات'),
      items: [
        { id: 'trees', title: L('Decision trees', 'أشجار القرار') },
        { id: 'utility', title: L('Utility & attitudes to risk', 'المنفعة والموقف من المخاطرة') },
        { id: 'information', title: L('Value of information', 'قيمة المعلومات') },
      ],
    },
  ],
  loaders: {},
}
