import { stripShebang } from '../../src'
import { generate } from '../tools/generate'
import { filenameShebangNode, filenameShebangUser, mockCWD } from '../tools/mock-cwd'

describe('"sourcemap" option', () => {

  test('should default to true and generate sourcemap without warnings', async () => {

    // These files contain shebangs
    const filenames = [
      filenameShebangNode,
      filenameShebangUser,
    ]

    // Get results using default "sourcemap" option
    const results = await mockCWD(() => {
      return Promise.all(filenames.map((filename) => {

        // Don't set "sourcemap" option to use default
        const plugin = stripShebang()

        // Generate result
        return generate(filename, [plugin])
      }))
    })

    // Expect source maps to be generated without warnings
    results.forEach(({ map, warnings }) => {
      expect(map).toBeInstanceOf(Object)
      expect(map?.sourcesContent).toStrictEqual(expect.arrayOf(expect.any(String)))
      expect(map?.sourcesContent?.length).toBeGreaterThan(0)
      expect(warnings).toHaveLength(0)
    })

  })

  test('should give a warning if sourcemap required but not generated', async () => {

    // These files contain shebangs
    const filenames = [
      filenameShebangNode,
      filenameShebangUser,
    ]

    // Get results using false as "sourcemap" option
    const results = await mockCWD(() => {
      return Promise.all(filenames.map((filename) => {

        // Set "sourcemap" option to false
        const plugin = stripShebang({ sourcemap: false })

        // Generate result
        return generate(filename, [plugin])
      }))
    })

    // Expect no sourcemap and a warning
    results.forEach(({ map, warnings }) => {
      expect(map).toMatchObject({ sourcesContent: [] })
      expect(warnings).toMatchObject([{ plugin: 'strip-shebang', code: 'SOURCEMAP_BROKEN' }])
    })

  })

})
