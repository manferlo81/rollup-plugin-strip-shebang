import mock, { restore as restoreMock } from 'mock-fs'

function fileContent(...lines: Array<string | null>) {
  return lines.map((line) => `${line ?? ''}\n`).join('')
}

export const shebangNode = '#!/usr/bin/env node'
export const shebangUser = '#!/usr/bin/env user'

export const filenameNoShebang = 'no-shebang.js'
export const filenameShebangNode = 'with-node-shebang.js'
export const filenameShebangUser = 'with-user-shebang.js'

export async function mockCWD<R>(callback: () => R | Promise<R>): Promise<R> {
  const cwd = process.cwd()
  const structure = {
    [cwd]: {
      [filenameNoShebang]: fileContent(
        'console.log("example with no shebang");',
      ),
      [filenameShebangNode]: fileContent(
        shebangNode,
        null,
        'console.log("example with node shebang");',
      ),
      [filenameShebangUser]: fileContent(
        shebangUser,
        null,
        'console.log("example with user shebang");',
      ),
    },
  }
  mock(structure, { createCwd: false, createTmp: false })
  try {
    return await callback()
  } finally {
    restoreMock()
  }
}
