import mock, { restore as restoreMock } from 'mock-fs'

export async function mockCWD<R>(callback: () => R | Promise<R>): Promise<R> {
  const cwd = process.cwd()
  mock({
    [cwd]: {
      'no-shebang.js': 'console.log(\'example with no shebang\');\n',
      'with-node-shebang.js': '#!/usr/bin/env node\n\nconsole.log(\'example with node shebang\');\n',
      'with-user-shebang.js': '#!/usr/bin/env user\n\nconsole.log(\'example with node shebang\');\n',
    },
  }, { createCwd: false, createTmp: false })
  try {
    return await callback()
  } finally {
    restoreMock()
  }
}
