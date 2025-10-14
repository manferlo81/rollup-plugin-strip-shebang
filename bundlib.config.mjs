import { defineConfig } from 'bundlib'

export default defineConfig({
  esModule: true,
  interop: true,
  project: './tsconfig.build.json',
})
