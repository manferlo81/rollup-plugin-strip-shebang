# rollup-plugin-strip-shebang

[![CircleCI](https://circleci.com/gh/manferlo81/rollup-plugin-strip-shebang.svg?style=svg)](https://circleci.com/gh/manferlo81/rollup-plugin-strip-shebang) [![Greenkeeper badge](https://badges.greenkeeper.io/manferlo81/rollup-plugin-strip-shebang.svg)](https://greenkeeper.io/) [![codecov](https://codecov.io/gh/manferlo81/rollup-plugin-strip-shebang/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/rollup-plugin-strip-shebang) [![npm](https://img.shields.io/npm/v/rollup-plugin-strip-shebang.svg)](https://www.npmjs.com/package/rollup-plugin-strip-shebang) [![dependencies Status](https://david-dm.org/manferlo81/rollup-plugin-strip-shebang/status.svg)](https://david-dm.org/manferlo81/rollup-plugin-strip-shebang) [![devDependencies Status](https://david-dm.org/manferlo81/rollup-plugin-strip-shebang/dev-status.svg)](https://david-dm.org/manferlo81/rollup-plugin-strip-shebang?type=dev) [![peerDependencies Status](https://david-dm.org/manferlo81/rollup-plugin-strip-shebang/peer-status.svg)](https://david-dm.org/manferlo81/rollup-plugin-strip-shebang?type=peer) [![install size](https://packagephobia.now.sh/badge?p=rollup-plugin-strip-shebang)](https://packagephobia.now.sh/result?p=rollup-plugin-strip-shebang) [![npm bundle size](https://img.shields.io/bundlephobia/min/rollup-plugin-strip-shebang.svg)](https://bundlephobia.com/result?p=rollup-plugin-strip-shebang) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/rollup-plugin-strip-shebang/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/rollup-plugin-strip-shebang?targetFile=package.json) [![licence](https://img.shields.io/npm/l/rollup-plugin-strip-shebang.svg)](https://github.com/manferlo81/rollup-plugin-strip-shebang/blob/master/LICENSE)

A [Rollup.js](https://github.com/rollup/rollup) plugin to remove and optionally extract shebang.

> :warning: _Note that it will only be detected if the shebang is the very first thing on the file._

## Install

```sh
npm install rollup-plugin-strip-shebang
```

_or..._

```sh
yarn add rollup-plugin-strip-shebang
```

## Usage

```javascript
// example.js
#!/usr/bin/env node

console.log("Hi!");
```

```javascript
// rollup.config.js
import strip from "rollup-plugin-strip-shebang";

export default {

  input: "example.js",

  output: {
    file: "dist/lib.js",
    format: "cjs"
  },

  plugins: [
    strip()
  ]

};
```

## Features

* [x] Target file filtering _(see [include](#include) & [exclude](#exclude))_
* [x] Capture stripped shebang _(see [capture](#capture) option)_
* [x] Sourcemap support _(see [sourcemap](#sourcemap) option)_

## Options

_All plugin options are optional._

#### include

_a [minimatch](https://github.com/isaacs/minimatch) pattern for include filter,_ [_see also_ `createFilter` _documentation_](https://github.com/rollup/rollup-pluginutils#createfilter)

`include: Array<string | RegExp> | string | RegExp | null`

#### exclude

_a [minimatch](https://github.com/isaacs/minimatch) pattern for exclude filter,_ [_see also_ `createFilter` _documentation_](https://github.com/rollup/rollup-pluginutils#createfilter)

`exclude: Array<string | RegExp> | string | RegExp | null`

#### capture

_you can pass a capture_ `function` _or_ `object` _to get the **stripped shebang** in case you need it later_

`capture: (shebang: string) => void`

```javascript
let strippedShebang;
...
  plugins: [
    strip({
      capture(shebang) {
        strippedShebang = shebang;
      },
    }),
  ]
...
console.log(strippedShebang);
```

`capture: object`

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

#### sourcemap

_you can pass_ `sourcemap = false` _to speed things up a bit if you don't need source maps. Anything other than_ `false` _will default to_ `true`_._

`sourcemap: boolean = true`

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

> :warning: _Note that you will get a warning if you set rollup to generate source maps and set this to_ `false`_._

## License

MIT License
