# rollup-plugin-strip-shebang

[![npm version](https://badge.fury.io/js/rollup-plugin-strip-shebang.svg)](https://badge.fury.io/js/rollup-plugin-strip-shebang) [![CircleCI](https://circleci.com/gh/manferlo81/rollup-plugin-strip-shebang.svg?style=svg)](https://circleci.com/gh/manferlo81/rollup-plugin-strip-shebang) [![Greenkeeper badge](https://badges.greenkeeper.io/manferlo81/rollup-plugin-strip-shebang.svg)](https://greenkeeper.io/) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)

A Rollup.js plugin to remove and optionally extract shebang.

> Note that it will only detect it if the shebang is the very first thing on the file.

## Usage

```js
// example.js
#!what/ever/here/will be stripped

console.log("Hi!");
```

```js
// rollup.config.js
import strip from "rollup-plugin-strip-shebang";

export default {

  input: "example.js",

  output: {
    file: "dist/lib.js",
    format: "cjs"
  },

  plugins: [
    strip({
      capture(shebang) {
        console.log(shebang + " was stripped from the file content.");
        // expected output
        // #!what/ever/here/will be stripped was stripped from the file content.
      },
      sourcemap: true
    })
  ]

};
```

## Options

- include
```
include: Array<string | RegExp> | string | RegExp | null
```
_a minimatch pattern for include filter_

- exclude
```
exclude: Array<string | RegExp> | string | RegExp | null
```
_a minimatch pattern for exclude filter_

- capture
```
capture: (shebang: string) => void
```
_you can pass a capture function to get the stripped shebang in case you need it later_

- sourcemap
```
sourcemap: boolean = true
```
_you can pass sourcemap = **false** to speed things up a bit if you don't need source maps. Anithing other than **false** will default to **true**. Note that you will get a warning if you set rollup to generate source maps and set this to **false**_
