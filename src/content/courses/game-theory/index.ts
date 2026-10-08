import type { Course } from '../../courses'
import { L } from '../../helpers'

// Outline only: the chapters are planned and show as "Coming soon" until a module is written and given a
// loader (see the add-module skill).
export const gameTheory: Course = {
  id: 'game-theory',
  category: 'management',
  audiences: ['professionals', 'entrepreneurs'],
  title: L('Game Theory', 'نظرية الألعاب'),
  description: L(
    'How people and firms decide when the outcome depends on what others do: strategies, equilibria, cooperation, auctions and bargaining.',
    'كيف يتخذ الأفراد والشركات قراراتهم عندما تتوقف النتيجة على ما يفعله الآخرون: الاستراتيجيات والتوازن والتعاون والمزادات والتفاوض.',
  ),
  audience: L(
    'Managers, founders and analysts who negotiate, price or compete and want to think a few moves ahead.',
    'للمديرين وروّاد الأعمال والمحللين الذين يتفاوضون أو يسعّرون أو ينافسون ويريدون التفكير بخطوات مسبقة.',
  ),
  groups: [
    {
      label: L('Foundations', 'الأساسيات'),
      items: [
        { id: 'strategic-thinking', title: L('Strategic thinking & games', 'التفكير الاستراتيجي والألعاب') },
        { id: 'nash', title: L('Nash equilibrium', 'توازن ناش') },
        { id: 'dominant', title: L('Dominant strategies & the prisoner’s dilemma', 'الاستراتيجيات المهيمنة ومعضلة السجين') },
      ],
    },
    {
      label: L('Applying it', 'التطبيق'),
      items: [
        { id: 'sequential', title: L('Sequential games', 'الألعاب المتتابعة') },
        { id: 'repeated', title: L('Repeated games & cooperation', 'الألعاب المتكررة والتعاون') },
        { id: 'auctions', title: L('Auctions & bargaining', 'المزادات والتفاوض') },
      ],
    },
  ],
  loaders: {},
}
