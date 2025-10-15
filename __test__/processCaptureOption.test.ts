import type { CaptureObject } from '../src'
import { processCaptureOption } from '../src/capture'

describe('processCaptureOption function', () => {

  test('should throw on invalid input', () => {

    // Invalid inputs
    const cases = [
      10,
      'string',
      true,
      false,
    ]

    // Expect to throw on invalid input
    cases.forEach((capture) => {
      const exec = () => processCaptureOption(capture as never)
      expect(exec).toThrow()
    })

  })

  test('should return null if input is nullish', () => {
    expect(processCaptureOption(null)).toBeNull()
    expect(processCaptureOption(undefined)).toBeNull()
    expect(processCaptureOption(void 0)).toBeNull()
  })

  describe('input as a function', () => {

    test('should return input is it\'s a function', () => {

      // Process option as a function
      const captureOption = () => null
      const captureFunction = processCaptureOption(captureOption)

      // Expect result to the input
      expect(captureFunction).toBe(captureOption)

    })

    test('should call input (as function) when capture function is called', () => {

      // Process option as a function
      const captureOption = jest.fn((capturedShebang: string) => capturedShebang)
      const captureFunction = processCaptureOption(captureOption)

      // Call capture function
      const capturedShebang = 'some shebang'
      captureFunction(capturedShebang)

      expect(captureOption).toHaveBeenCalledTimes(1)
      expect(captureOption).toHaveBeenNthCalledWith(1, capturedShebang)

    })

  })

  describe('input as object', () => {

    test('should return capture function if input is an object', () => {

      // Process option as object
      const captureOption: CaptureObject = {}
      const captureFunction = processCaptureOption(captureOption)

      // Expect result to be a function
      expect(captureFunction).toBeInstanceOf(Function)

    })

    test('should populate input object when capture function is called', () => {

      // Process option as object
      const initial = {}
      const captureOption: CaptureObject = { ...initial }
      const captureFunction = processCaptureOption(captureOption)

      // Call capture function
      const capturedShebang = 'some shebang'
      captureFunction(capturedShebang)

      // Expect object to be empty
      expect(initial).toStrictEqual({})

      // Expect object to be populated with captured shebang
      expect(captureOption).toStrictEqual({
        shebang: capturedShebang,
      })

    })

  })

})
