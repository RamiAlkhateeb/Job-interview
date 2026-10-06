import { describe, expect, it } from 'vitest'
import { getCourse } from '../src/content/courses'
import { nodeOffset, pathStates } from '../src/features/course/pathStates'

describe('skill path', () => {
  const course = getCourse('tech-interview')!

  it('makes the first written module current and later written ones locked', () => {
    const s = pathStates(course, [])
    expect(s.resume).toBe('current')
    expect(s.dotnet).toBe('locked')
    expect(s.behavioral).toBe('soon')
  })

  it('moves "current" past finished modules', () => {
    const s = pathStates(course, ['tech-interview/resume'])
    expect(s.resume).toBe('done')
    expect(s.dotnet).toBe('current')
    expect(s.dsa).toBe('locked')
  })

  it('winds back and forth', () => {
    expect([0, 1, 2, 3, 4, 5].map(nodeOffset)).toEqual([0, 44, 72, 44, 0, -44])
    expect(nodeOffset(8)).toBe(0)
  })
})
