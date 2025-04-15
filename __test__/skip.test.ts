import { stripShebang } from '../src'
import { generate } from './tools/generate'
import { mockCWD } from './tools/mock-cwd'

describe('skip', () => {

  test('should skip files without shebang', () => {
    const input = 'no-shebang.js'
    const plugins = [
      stripShebang(),
    ]
    const promise = mockCWD(() => generate(input, plugins))
    return expect(promise).resolves.toBeInstanceOf(Object)
  })

  test('should skip files using "include" option', () => {
    const input = 'with-user-shebang.js'
    const plugins = [
      stripShebang({ include: /anything\.js/ }),
    ]
    const promise = mockCWD(() => generate(input, plugins))
    return expect(promise).resolves.toBeInstanceOf(Object)
  })

  test('should skip files using "include" option', () => {
    const input = 'with-node-shebang.js'
    const plugins = [
      stripShebang({ include: /anything\.js/ }),
    ]
    const promise = mockCWD(() => generate(input, plugins))
    return expect(promise).resolves.toBeInstanceOf(Object)
  })

  test('should skip files using "exclude" option', async () => {
    const input = 'with-node-shebang.js'
    const plugins = [
      stripShebang({ exclude: /with-node-shebang\.js/ }),
    ]
    const promise = mockCWD(() => generate(input, plugins))
    return expect(promise).resolves.toBeInstanceOf(Object)
  })

})
