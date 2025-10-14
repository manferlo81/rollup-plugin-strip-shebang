import { stripShebang } from '../../src'
import { generate } from '../tools/generate'
import { filenameShebangNode, filenameShebangUser, mockCWD } from '../tools/mock-cwd'

describe('"include" option', () => {

  test('should process javascript and typescript files by default', async () => {

    // These files have .js extension (allowed by default)
    const filenames = [
      filenameShebangNode,
      filenameShebangUser,
    ]

    // Get the results using default pattern
    const results = await mockCWD(() => {
      return Promise.all(filenames.map((input) => {

        // Don't set "include" option to use default option
        const plugin = stripShebang()

        // Generate result
        return generate(input, [plugin])
      }))
    })

    // Expect the generated code not to have the original shebang because it was stripped
    results.forEach(({ code }) => expect(code).not.toMatch(/^#!/))

  })

  test('should skip files if they don\'t match "include" option pattern', async () => {

    // These files contain shebangs
    const filenames = [
      filenameShebangNode,
      filenameShebangUser,
    ]

    // Get the results using a pattern that doesn't match any of the files
    const results = await mockCWD(() => {
      return Promise.all(filenames.map((input) => {

        // Set "include" option not to match anything
        const plugin = stripShebang({ include: /does-not-match\.js/ })

        // Generate result
        return generate(input, [plugin])
      }))
    })

    // Expect the generated code to still contain original shebang because they were ignored
    results.forEach(({ code }) => expect(code).toMatch(/^#!/))

  })

})
