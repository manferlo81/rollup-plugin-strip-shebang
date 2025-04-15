import { stripShebang } from '../src'
import { generate } from './tools/generate'
import { mockCWD } from './tools/mock-cwd'

describe('sourcemap option', () => {

  test('should respect sourcemap and give a warning', async () => {

    const { map, warnings } = await mockCWD(() => generate('with-node-shebang.js', [
      stripShebang({ sourcemap: false }),
    ]))

    expect(map).toBeTruthy()
    expect(map?.sourcesContent).toHaveLength(0)
    expect(warnings).toHaveLength(1)
    expect(warnings[0].code).toBe('SOURCEMAP_BROKEN')

  })

  test('should sourcemap default to true and generate sourcemap', async () => {

    const { map, warnings } = await mockCWD(() => generate('with-node-shebang.js', [
      stripShebang(),
    ]))

    expect(map).toBeTruthy()
    expect(map?.sourcesContent).toBeTruthy()
    expect(map?.sourcesContent?.length).toBeGreaterThan(0)
    expect(warnings).toHaveLength(0)

  })

})
