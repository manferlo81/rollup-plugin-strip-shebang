# rollup-plugin-strip-shebang

[![CircleCI](https://circleci.com/gh/manferlo81/rollup-plugin-strip-shebang.svg?style=svg)](https://circleci.com/gh/manferlo81/rollup-plugin-strip-shebang) [![npm](https://badgen.net/npm/v/rollup-plugin-strip-shebang)](https://www.npmjs.com/package/rollup-plugin-strip-shebang) [![codecov](https://codecov.io/gh/manferlo81/rollup-plugin-strip-shebang/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/rollup-plugin-strip-shebang) [![dependencies](https://badgen.net/david/dep/manferlo81/rollup-plugin-strip-shebang)](https://david-dm.org/manferlo81/rollup-plugin-strip-shebang) [![dev dependencies](https://badgen.net/david/dev/manferlo81/rollup-plugin-strip-shebang)](https://david-dm.org/manferlo81/rollup-plugin-strip-shebang?type=dev) [![peer dependencies](https://badgen.net/david/peer/manferlo81/rollup-plugin-strip-shebang)](https://david-dm.org/manferlo81/rollup-plugin-strip-shebang?type=peer) [![packagephobia](https://badgen.net/packagephobia/install/rollup-plugin-strip-shebang)](https://packagephobia.now.sh/result?p=rollup-plugin-strip-shebang) [![bundlephobia](https://badgen.net/bundlephobia/min/rollup-plugin-strip-shebang)](https://bundlephobia.com/result?p=rollup-plugin-strip-shebang) [![types](https://img.shields.io/npm/types/rollup-plugin-strip-shebang.svg)](https://github.com/microsoft/typescript) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/rollup-plugin-strip-shebang/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/rollup-plugin-strip-shebang?targetFile=package.json) [![license](https://badgen.net/github/license/manferlo81/rollup-plugin-strip-shebang)](LICENSE)

A [Rollup.js](https://github.com/rollup/rollup) plugin to remove and optionally extract shebang.

## DEPRECATION NOTICE

As of Rollup v3 shebang will be stripped by rollup itself, but you might still need this plugin if you need to capture the shebang in order to add it back later.

As of [Rollup v4](https://github.com/rollup/rollup/blob/master/CHANGELOG.md#400) shebang will be stripped out and added back into the output file ([check it out here](https://github.com/rollup/rollup/pull/5163)), making this plugin almost unnecessary.

## Install

```bash
npm i rollup-plugin-strip-shebang
```

## Usage

```javascript
// example.js
#!/usr/bin/env node

console.log("Hi!");
```

```javascript
// rollup.config.js
import { stripShebang } from "rollup-plugin-strip-shebang";

export default {

  input: "example.js",

  output: {
    file: "bin/cli.js",
    format: "cjs"
  },

  plugins: [
    stripShebang()
  ]

};
```

## Features

* Target file filtering *(see [include / exclude](#include--exclude))*
* Capture stripped shebang *(see [capture](#capture) option)*
* Sourcemap support *(see [sourcemap](#sourcemap) option)*

## Options

### include / exclude

[minimatch](https://github.com/isaacs/minimatch) pattern to be used as filter, see `createFilter` [documentation](https://github.com/rollup/rollup-pluginutils#createfilter).

***syntax***

```typescript
include: Array<string | RegExp> | string | RegExp | null;
exclude: Array<string | RegExp> | string | RegExp | null;
```

### capture

You can pass a capture `function` or `object` to get the stripped shebang in case you need it later.

#### function

***syntax***

```typescript
capture: (shebang: string) => void;
```

***example***

```javascript
let shebang;
...
  plugins: [
    strip({
      capture(capturedShebang) {
        shebang = capturedShebang;
      },
    }),
  ]
...
console.log(shebang);
```

#### object

***syntax***

```typescript
capture: Object;
```

***example***

```javascript
let capture = {};
...
  plugins: [
    strip({
      capture,
    }),
  ]
...
console.log(capture.shebang);
```

### sourcemap

You can pass `sourcemap: false` to speed things up a bit if you don't need source maps. Anything other than `false` will default to `true`, including `null` and `undefined`.

***syntax***

```typescript
sourcemap: boolean = true;
```

***example***

```javascript
...
  output: {
    file: "bin/lib.js",
    sourcemap: false,
  },
  plugins: [
    strip({
      sourcemap: false,
    }),
  ]
...
```

> :warning: *Note that you will get a warning if you set rollup to generate source maps and set this to* `false`*.*

## License

[MIT](LICENSE) &copy; 2019-2024 [Manuel Fernández](https://github.com/manferlo81)
