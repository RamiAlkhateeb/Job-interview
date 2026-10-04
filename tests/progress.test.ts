import { describe, expect, it } from 'vitest'
import { markRead, parseProgress, recordAnswer } from '../src/features/progress/store'

describe('progress store helpers', () => {
  it('parses missing or corrupt storage as empty progress', () => {
    expect(parseProgress(null)).toEqual({ answers: {}, sectionsRead: {} })
    expect(parseProgress('{not json')).toEqual({ answers: {}, sectionsRead: {} })
  })

  it('records the latest answer per question without mutating', () => {
    const empty = parseProgress(null)
    const first = recordAnswer(empty, 'net-q001', 1, false)
    const second = recordAnswer(first, 'net-q001', 0, true)
    expect(empty.answers).toEqual({})
    expect(second.answers['net-q001']).toEqual({ selected: 0, correct: true })
  })

  it('marks a section read once and returns the same object when nothing changes', () => {
    const p = markRead(parseProgress(null), 'tech-interview/resume', 'template')
    expect(markRead(p, 'tech-interview/resume', 'template')).toBe(p)
    expect(markRead(p, 'tech-interview/resume', 'content').sectionsRead['tech-interview/resume']).toEqual(['template', 'content'])
  })
})
