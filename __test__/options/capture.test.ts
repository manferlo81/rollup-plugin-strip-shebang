import type { CaptureObject } from '../../src'
import { stripShebang } from '../../src'
import { generate } from '../tools/generate'
import { filenameShebangNode, filenameShebangUser, mockCWD, shebangNode, shebangUser } from '../tools/mock-cwd'

describe('"capture" option', () => {

  test('should throw on invalid "capture" option', () => {

    // These values are not valid as "capture" option
    const invalidCaptureOptions = [
      100,
      'string',
      true,
      false,
    ]

    // Expect plugin to throw an error
    invalidCaptureOptions.forEach((invalid) => {
      const exec = () => stripShebang({ capture: invalid as never })
      expect(exec).toThrow('should be a function or an object')
    })
  })

  test('should capture shebang using a function as "capture" option', async () => {

    const cases = [
      { filename: filenameShebangNode, expectedShebang: shebangNode },
      { filename: filenameShebangUser, expectedShebang: shebangUser },
    ]

    const results = await mockCWD(() => {
      return Promise.all(cases.map(async ({ filename, expectedShebang }) => {

        // Declare variable to receive the captured shebang
        let shebang: string | undefined

        // Function to capture shebang
        const capture = (capturedShebang: string) => {
          shebang = capturedShebang
        }

        // Generate code
        const plugin = stripShebang({ capture })
        await generate(filename, [plugin])

        // shebang variable should be defined here
        return { shebang, expectedShebang }
      }))
    })

    // Expect all captured shebangs to be as expected
    results.forEach(({ shebang, expectedShebang }) => expect(shebang).toBe(expectedShebang))

  })

  test('should capture shebang using an object as "capture" option', async () => {

    const cases = [
      { filename: filenameShebangNode, expectedShebang: shebangNode },
      { filename: filenameShebangUser, expectedShebang: shebangUser },
    ]

    const results = await mockCWD(() => {
      return Promise.all(cases.map(async ({ filename, expectedShebang }) => {

        // Declare empty object to receive captured shebang
        const initial = {}
        const capture: CaptureObject = { ...initial }

        // Generate code
        const plugin = stripShebang({ capture })
        await generate(filename, [plugin])

        // shebang object should have a "shebang" property now
        return { initial, capture, expectedShebang }
      }))
    })

    // Expect all captured shebangs to be as expected
    results.forEach(({ initial, capture, expectedShebang }) => {
      expect(initial).toStrictEqual({})
      expect(capture).toStrictEqual({ shebang: expectedShebang })
    })

  })

})
