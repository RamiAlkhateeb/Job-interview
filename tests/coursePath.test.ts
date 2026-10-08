import { describe, expect, it } from 'vitest'
import { nodeOffset, unitStates } from '../src/features/course/pathStates'

describe('roadmap', () => {
  const ids = ['overview', 'template', 'content', 'keywords']
  const prefix = 'tech-interview/resume'

  it('opens the first lesson of a fresh unit and locks the rest', () => {
    expect(unitStates(ids, [], prefix)).toEqual(['current', 'locked', 'locked', 'locked'])
  })

  it('moves "current" past finished lessons; finished ones stay open', () => {
    const done = [`${prefix}/overview`, `${prefix}/template`]
    expect(unitStates(ids, done, prefix)).toEqual(['done', 'done', 'current', 'locked'])
  })

  it('treats each unit on its own', () => {
    // Progress in another module does not unlock or lock this one.
    expect(unitStates(ids, ['tech-interview/dsa/approach'], prefix)[0]).toBe('current')
    expect(unitStates(ids, ids.map((id) => `${prefix}/${id}`), prefix)).toEqual(['done', 'done', 'done', 'done'])
  })

  it('winds back and forth', () => {
    expect([0, 1, 2, 3, 4, 5].map(nodeOffset)).toEqual([0, 44, 72, 44, 0, -44])
    expect(nodeOffset(8)).toBe(0)
  })
})
