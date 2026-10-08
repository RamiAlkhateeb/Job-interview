import type { Course } from '../../courses'
import { L } from '../../helpers'

// Outline only: the chapters are planned and show as "Coming soon" until a module is written and given a
// loader (see the add-module skill).
export const dataAnalysis: Course = {
  id: 'data-analysis',
  category: 'careers',
  audiences: ['job-seekers', 'professionals'],
  title: L('Data Analysis', 'تحليل البيانات'),
  description: L(
    'Turn raw data into decisions: asking the right question, cleaning data, descriptive statistics, charts, Excel and SQL, and presenting what you found.',
    'حوّل البيانات الخام إلى قرارات: طرح السؤال الصحيح، وتنظيف البيانات، والإحصاء الوصفي، والرسوم البيانية، وExcel وSQL، وعرض ما توصلت إليه.',
  ),
  audience: L(
    'Job seekers aiming for analyst roles and professionals who want to make better use of their organisation’s data.',
    'للباحثين عن عمل في وظائف التحليل وللمهنيين الذين يريدون الاستفادة أكثر من بيانات مؤسساتهم.',
  ),
  groups: [
    {
      label: L('Foundations', 'الأساسيات'),
      items: [
        { id: 'thinking', title: L('Thinking with data', 'التفكير بالبيانات') },
        { id: 'cleaning', title: L('Cleaning & preparing data', 'تنظيف البيانات وتجهيزها') },
        { id: 'descriptive', title: L('Descriptive statistics', 'الإحصاء الوصفي') },
      ],
    },
    {
      label: L('Tools & communication', 'الأدوات والعرض'),
      items: [
        { id: 'visualisation', title: L('Visualising data', 'تصوير البيانات بصريًا') },
        { id: 'excel-sql', title: L('Excel & SQL for analysis', 'Excel وSQL للتحليل') },
        { id: 'insights', title: L('Communicating insights', 'عرض النتائج والرؤى') },
      ],
    },
  ],
  loaders: {},
}
