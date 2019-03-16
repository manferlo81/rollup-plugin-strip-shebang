# rollup-plugin-strip-shebang
A Rollup.js plugin to remove and optionally extract shebang.

Note that it will only detect it if the shebang is the very first thing on the file.

### Usage

```js
// example.js this line
#!what/ever/here/will be stripped

console.log("Hi!");
```

```js
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
        // #!what/ever/here/will be stripped was stripped from the file content.
      },
      sourcemap: true
    })
  ]

};
```

### Options

##### capture
_capture?: (shebang: string) => void;_

you can pass a capture function to get the stripped shebang in case you need it later.

##### sourcemap
_sourcemap: boolean = true_

you can pass sourcemap = **false** to speed things up a bit if you dont need source maps.
Anithing other than **false** will default to **true**.


