import { defaultIncludePattern } from '../../src/constants'

describe('defaultIncludePattern constant', () => {

  test('should match javascript and typescript files', () => {
    const extensions = [
      'js',
      'ts',
    ]
    extensions.forEach((extension) => {
      expect(defaultIncludePattern.test(`filename.${extension}`)).toBe(true)
      expect(defaultIncludePattern.test(`some/path/to/filename.${extension}`)).toBe(true)
    })
  })

  test('should not match files with similar extension', () => {
    const extensions = [
      'xjs',
      'xts',
      'js_',
      'ts_',
    ]
    extensions.forEach((extension) => {
      expect(defaultIncludePattern.test(`filename.${extension}`)).toBe(false)
      expect(defaultIncludePattern.test(`some/path/to/filename.${extension}`)).toBe(false)
    })
  })

  test('should match other files', () => {
    const cases = [
      'README.md',
      'package.json',
      '.gitignore',
      'component.vue',
    ]
    cases.forEach((filename) => {
      expect(defaultIncludePattern.test(filename)).toBe(false)
      expect(defaultIncludePattern.test(`some/path/${filename}`)).toBe(false)
    })
  })

})
