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

  test('should match module(.mjs) and commonjs(.cjs) javascript files', () => {
    const extensions = [
      'mjs',
      'cjs',
    ]
    extensions.forEach((extension) => {
      expect(defaultIncludePattern.test(`filename.${extension}`)).toBe(true)
      expect(defaultIncludePattern.test(`some/path/to/filename.${extension}`)).toBe(true)
    })
  })

  test('should match module(.mts) and commonjs(.cts) typescript files', () => {
    const extensions = [
      'mts',
      'cts',
    ]
    extensions.forEach((extension) => {
      expect(defaultIncludePattern.test(`filename.${extension}`)).toBe(true)
      expect(defaultIncludePattern.test(`some/path/to/filename.${extension}`)).toBe(true)
    })
  })

  test('should not match JSX files', () => {
    const extensions = [
      'jsx',
      'tsx',
    ]
    extensions.forEach((extension) => {
      expect(defaultIncludePattern.test(`filename.${extension}`)).toBe(false)
      expect(defaultIncludePattern.test(`some/path/to/filename.${extension}`)).toBe(false)
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
    const filenames = [
      'README.md',
      'package.json',
      '.gitignore',
      'component.vue',
    ]
    filenames.forEach((filename) => {
      expect(defaultIncludePattern.test(filename)).toBe(false)
      expect(defaultIncludePattern.test(`some/path/to/${filename}`)).toBe(false)
    })
  })

})
