import type { Course } from '../../courses'
import { L } from '../../helpers'

// Outline only: the chapters are planned and show as "Coming soon" until a module is written and given a
// loader (see the add-module skill).
export const dss: Course = {
  id: 'dss',
  category: 'management',
  audiences: ['professionals'],
  title: L('Modeling Procedures in Decision Support Systems', 'إجراءات النمذجة في نظم دعم القرار'),
  description: L(
    'How decision support systems turn a business problem into a model: the modelling process, linear programming, simulation, multi-criteria methods, and building and validating a DSS.',
    'كيف تحوّل نظم دعم القرار مشكلة العمل إلى نموذج: عملية النمذجة، والبرمجة الخطية، والمحاكاة، وأساليب المعايير المتعددة، وبناء نظام دعم القرار والتحقق منه.',
  ),
  audience: L(
    'Analysts, managers and IT professionals who build or rely on models to support decisions.',
    'للمحللين والمديرين ومتخصصي تقنية المعلومات الذين يبنون النماذج أو يعتمدون عليها لدعم القرار.',
  ),
  groups: [
    {
      label: L('Foundations', 'الأساسيات'),
      items: [
        { id: 'what', title: L('What a decision support system is', 'ما هو نظام دعم القرار') },
        { id: 'process', title: L('The modelling process', 'عملية النمذجة') },
      ],
    },
    {
      label: L('Models', 'النماذج'),
      items: [
        { id: 'lp', title: L('Linear programming models', 'نماذج البرمجة الخطية') },
        { id: 'simulation', title: L('Simulation models', 'نماذج المحاكاة') },
        { id: 'mcdm', title: L('Multi-criteria decision models', 'نماذج القرار متعدد المعايير') },
        { id: 'build', title: L('Building & validating a DSS', 'بناء نظام دعم القرار والتحقق منه') },
      ],
    },
  ],
  loaders: {},
}
