import type { Course } from '../../courses'
import { L } from '../../helpers'

// Outline only: the chapters are planned and show as "Coming soon" until a module is written and given a
// loader (see the add-module skill).
export const management: Course = {
  id: 'management',
  category: 'management',
  audiences: ['professionals', 'entrepreneurs'],
  title: L('Fundamentals of Management and Theories of Organizations', 'أساسيات الإدارة ونظريات المنظمة'),
  description: L(
    'What managers do and the big ideas behind how organisations work: from the classical and human-relations schools to systems thinking, structure, culture and change.',
    'ماذا يفعل المديرون والأفكار الكبرى وراء عمل المنظمات: من المدرسة الكلاسيكية والعلاقات الإنسانية إلى التفكير النظمي والهيكل والثقافة والتغيير.',
  ),
  audience: L(
    'New and aspiring managers, team leads and founders building their first team.',
    'للمديرين الجدد والطامحين وقادة الفرق وروّاد الأعمال الذين يبنون فريقهم الأول.',
  ),
  groups: [
    {
      label: L('Management', 'الإدارة'),
      items: [
        { id: 'managers', title: L('What managers do', 'ماذا يفعل المديرون') },
        { id: 'classical', title: L('Classical management theories', 'نظريات الإدارة الكلاسيكية') },
        { id: 'behavioural', title: L('Behavioural & human-relations school', 'المدرسة السلوكية والعلاقات الإنسانية') },
      ],
    },
    {
      label: L('Organisations', 'المنظمات'),
      items: [
        { id: 'systems', title: L('Systems & contingency theories', 'نظرية النظم والنظرية الموقفية') },
        { id: 'structure', title: L('Organisational structure & design', 'الهيكل والتصميم التنظيمي') },
        { id: 'culture', title: L('Organisational culture & change', 'الثقافة التنظيمية والتغيير') },
      ],
    },
  ],
  loaders: {},
}
