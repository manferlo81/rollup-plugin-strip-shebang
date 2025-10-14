import mock, { restore as restoreMock } from 'mock-fs'

function fileContent(...lines: Array<string | null>) {
  return lines.map((line) => `${line ?? ''}\n`).join('')
}

export async function mockCWD<R>(callback: () => R | Promise<R>): Promise<R> {
  const cwd = process.cwd()
  const structure = {
    [cwd]: {
      'no-shebang.js': fileContent(
        'console.log("example with no shebang");',
      ),
      'with-node-shebang.js': fileContent(
        '#!/usr/bin/env node',
        null,
        'console.log("example with node shebang");',
      ),
      'with-user-shebang.js': fileContent(
        '#!/usr/bin/env user',
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
