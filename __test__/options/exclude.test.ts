import { stripShebang } from '../../src'
import { generate } from '../tools/generate'
import { filenameShebangNode, filenameShebangUser, mockCWD } from '../tools/mock-cwd'

describe('"exclude" option', () => {

  test('should skip files if they match "exclude" option pattern', async () => {

    // These files contain shebangs
    const filenames = [
      filenameShebangNode,
      filenameShebangUser,
    ]

    // Get the results using a pattern that matches all files
    const results = await mockCWD(() => {
      return Promise.all(filenames.map((input) => {

        // Set "exclude" option to match all files
        const plugin = stripShebang({ exclude: /\.js/ })

        // Generate result
        return generate(input, [plugin])
      }))
    })

    // Expect the generated code to still contain original shebang because they were ignored
    results.forEach(({ code }) => expect(code).toMatch(/^#!/))
  })

})
