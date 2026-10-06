import { describe, expect, it } from 'vitest'
import { parseSettings } from '../src/features/settings/store'

describe('settings', () => {
  it('defaults to the system theme with sound on', () => {
    expect(parseSettings(null, null)).toEqual({ theme: 'system', sound: true })
    expect(parseSettings('purple', 'maybe')).toEqual({ theme: 'system', sound: true })
  })

  it('keeps a saved light/dark choice (the old toggle used the same key) and sound off', () => {
    expect(parseSettings('dark', 'off')).toEqual({ theme: 'dark', sound: false })
    expect(parseSettings('light', 'on')).toEqual({ theme: 'light', sound: true })
  })
})
