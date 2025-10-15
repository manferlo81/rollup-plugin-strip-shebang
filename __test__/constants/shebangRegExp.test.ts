import { shebangRegExp } from '../../src/constants'

describe('shebangRegExp constant', () => {

  test('should match shebang string', () => {
    const cases = [
      '#! /bin/sh',
      '#!/usr/bin/env node',
      '#!something',
      '#!something/else',
    ]
    cases.forEach((shebang) => {
      expect(shebangRegExp.exec(shebang)).toEqual(expect.arrayContaining([shebang]))
    })
  })

  test('should not if the shebang is not at the very start', () => {
    const cases = [
      ' #!something',
      '   #!something/else',
      'something   #!something/else',
    ]
    cases.forEach((shebang) => {
      expect(shebangRegExp.exec(shebang)).toBeNull()
    })
  })

  test('should not match other strings', () => {
    const cases = [
      'something',
      'anything',
    ]
    cases.forEach((shebang) => {
      expect(shebangRegExp.exec(shebang)).toBeNull()
    })
  })

})
