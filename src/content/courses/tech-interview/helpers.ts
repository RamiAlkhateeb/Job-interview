import type { Block, Localized, Question } from '../../types'

export const COURSE_ID = 'tech-interview'

/** `<h2>` + standfirst markup for a section heading. */
export const heading = (title: Localized, standfirst?: Localized): Localized => ({
  en: `<h2>${title.en}</h2>${standfirst ? `<p class="standfirst">${standfirst.en}</p>` : ''}`,
  ar: `<h2>${title.ar ?? title.en}</h2>${standfirst ? `<p class="standfirst">${standfirst.ar ?? standfirst.en}</p>` : ''}`,
})

export const cover = (kicker: Localized, title: Localized, time: Localized) => ({
  kicker,
  titleHtml: { en: `<h1>${title.en}</h1>`, ar: `<h1>${title.ar ?? title.en}</h1>` },
  timeEstimate: time,
})

export const html = (value: Localized): Block => ({ type: 'html', html: value })

/** Multiple-choice question with stable id `<module>-qNNN`; `answer` is the index into `options`. */
export function mcq(
  module: string,
  weekId: string,
  n: number,
  topic: string,
  prompt: Localized,
  options: Localized[],
  answer: number,
): Question {
  return { id: `${module}-q${String(n).padStart(3, '0')}`, weekId, topic, prompt, options, answer }
}
