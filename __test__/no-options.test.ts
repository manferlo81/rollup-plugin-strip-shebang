import { stripShebang } from '../src'
import { generate } from './tools/generate'
import { filenameNoShebang, filenameShebangNode, filenameShebangUser, mockCWD } from './tools/mock-cwd'

describe('no options', () => {

  test('should strip shebang', async () => {

    // These files contain shebangs
    const filenames = [
      filenameShebangNode,
      filenameShebangUser,
    ]

    // Get results with no options
    const results = await mockCWD(() => {
      return Promise.all(filenames.map((input) => {

        // Set no options
        const plugin = stripShebang()

        // Generate result
        return generate(input, [plugin])
      }))
    })

    // Expect generated code not to have a shebang
    results.forEach(({ code }) => expect(code).not.toMatch(/#!/))

  })

  test('should ignore file if it doesn\'t have shebang', async () => {

    // Generate code
    const { code } = await mockCWD(() => {
      const plugin = stripShebang()
      return generate(filenameNoShebang, [plugin])
    })

    // Expect generated code not to have a shebang
    expect(code).not.toMatch(/#!/)

  })

})
