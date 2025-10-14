import { shebangRegExp } from '../src/constants'

// /^#!.*/

describe('shebangRegExp constant', () => {

  test('should match shebang string', () => {
    const cases = [
      '#!something',
      '#!something/else',
    ]
    cases.forEach((shebang) => {
      expect(shebangRegExp.exec(shebang)).not.toBeNull()
    })
  })

  test('should not if the shebang is not at the very start', () => {
    const cases = [
      ' #!something',
      '   #!something/else',
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
