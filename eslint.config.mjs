import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

import pluginJavascript from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import { flatConfigs as pluginImportConfigs } from 'eslint-plugin-import-x'
import { configs as pluginTypescriptConfigs } from 'typescript-eslint'

// Constants

const PATTERN_JS = '**/*.{js,mjs}'
const PATTERN_TS = '**/*.ts'

const FILES_TS_ONLY = [PATTERN_TS]
const FILES_ALL = [PATTERN_JS, PATTERN_TS]

// Plugin Javascript

const configPluginJavascript = defineConfig({
  rules: ruleNormalizer()({
    // Safety
    'no-eval': 'on',
    'no-implied-eval': 'on',
    'no-new-func': 'on',
    'no-unmodified-loop-condition': 'on',
    'no-bitwise': { allow: ['~', '^', '>>>'] },
    eqeqeq: 'smart',
    // Style
    'no-var': 'on',
    'prefer-const': 'on',
    'no-unassigned-vars': 'on',
    'prefer-template': 'on',
    'prefer-rest-params': 'on',
    'prefer-spread': 'on',
    'no-throw-literal': 'on',
    'prefer-exponentiation-operator': 'on',
    curly: ['on', 'multi-line'],
    'require-await': 'on',
    'prefer-object-has-own': 'on',
    'prefer-regex-literals': 'on',
    'no-array-constructor': 'on',
    'no-object-constructor': 'on',
    'no-inner-declarations': ['functions', { blockScopedFunctions: 'disallow' }],
    // Useless code
    'no-useless-rename': 'on',
    'object-shorthand': 'on',
    'no-unreachable-loop': 'on',
    'no-useless-concat': 'on',
    'no-unused-expressions': 'on',
    'no-useless-computed-key': 'on',
    'no-useless-constructor': 'on',
    'no-useless-return': 'on',
    'no-useless-assignment': 'on',
    'no-else-return': { allowElseIf: false },
  }),
  files: FILES_ALL,
  extends: [
    pluginJavascript.configs.recommended,
  ],
})

// Plugin Typescript

const configPluginTypescript = defineConfig({
  rules: ruleNormalizer({ plugin: '@typescript-eslint' })({
    'array-type': { default: 'array-simple', readonly: 'array-simple' },
    'restrict-template-expressions': {
      allowBoolean: false,
      allowNullish: false,
      allowRegExp: false,
      allowAny: false,
    },
    'unified-signatures': { ignoreDifferentlyNamedParameters: true },
    'consistent-type-imports': 'on',
    'consistent-type-exports': 'on',
    'no-confusing-void-expression': { ignoreVoidReturningFunctions: true },
  }),
  files: FILES_TS_ONLY,
  ...{
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
  },
  extends: [
    pluginTypescriptConfigs.strictTypeChecked,
    pluginTypescriptConfigs.stylisticTypeChecked,
  ],
})

// Plugin Import

const configPluginImport = defineConfig({
  rules: ruleNormalizer({ plugin: 'import-x' })({
    'consistent-type-specifier-style': 'on',
    'no-useless-path-segments': 'on',
    'no-absolute-path': 'on',
    'no-cycle': 'on',
    'no-nodejs-modules': 'on',
  }),
  files: FILES_ALL,
  extends: [
    pluginImportConfigs.recommended,
    pluginImportConfigs.typescript,
  ],
})

// Plugin Stylistic

const configPluginStylistic = defineConfig({
  rules: ruleNormalizer({ plugin: '@stylistic' })({
    indent: ['on', 2],
    quotes: 'single',
    'linebreak-style': 'unix',
    'no-extra-parens': 'all',
    'no-extra-semi': 'on',
    'padded-blocks': 'off',
  }),
  files: FILES_ALL,
  extends: [
    pluginStylistic.configs.customize({
      arrowParens: true,
      quoteProps: 'as-needed',
      braceStyle: '1tbs',
      jsx: false,
    }),
  ],
})

// Configuration

export default defineConfig(
  globalIgnores(['dist', 'coverage']),
  { languageOptions: { globals: globals.node } },
  configPluginJavascript,
  configPluginTypescript,
  configPluginImport,
  configPluginStylistic,
)

// Helpers

function ruleNormalizer({ severity: defaultSeverity = 'error', plugin: pluginName } = {}) {

  // Throw TypeError if default severity is not valid
  const isDefaultSeverity = (entry) => ['error', 'warn', 1, 2].includes(entry)
  if (!isDefaultSeverity(defaultSeverity)) throw new TypeError('Invalid default severity.')

  // User severity resolver
  const resolveSeverity = (entry) => {

    // Resolve to default severity if entry is "on" or true
    if (entry === 'on' || entry === true) return [true, defaultSeverity]

    // Resolve to "off" if entry is false
    if (entry === false) return [true, 'off']

    // Resolve to entry if it's a valid severity
    return [entry === 'off' || entry === 0 || isDefaultSeverity(entry), entry]
  }

  // Rule entry normalizer
  const normalizeRuleEntry = (entry) => {

    // Return severity if it resolves to a valid severity
    const [isValidSeverity, severity] = resolveSeverity(entry)
    if (isValidSeverity) return severity

    // Process entry as array
    if (Array.isArray(entry)) {

      // Return default severity if array is empty
      if (!entry.length) return defaultSeverity

      // Return severity rule first element resolves to a valid severity
      const [first, ...rest] = entry
      const [isValidSeverity, severity] = resolveSeverity(first)
      if (isValidSeverity) return [severity, ...rest]

      // Return default severity rule with options
      return [defaultSeverity, ...entry]
    }

    // Return default severity rule with one option
    return [defaultSeverity, entry]
  }

  // Rule normalizer factory
  const createRuleNormalizer = (normalizeObjectEntry) => {
    return (rules) => {
      const entries = Object.entries(rules)
      const entriesNormalized = entries.map(normalizeObjectEntry)
      return Object.fromEntries(entriesNormalized)
    }
  }

  // Return simplified normalizer if no plugin defined
  if (!pluginName) {
    return createRuleNormalizer(
      ([ruleName, entry]) => [
        ruleName,
        normalizeRuleEntry(entry),
      ],
    )
  }

  // Declare plugin prefix
  const pluginPrefix = `${pluginName}/`

  // Rule name normalizer
  const normalizeRuleName = (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName
    return `${pluginPrefix}${ruleName}`
  }

  // Return rule normalizer
  return createRuleNormalizer(
    ([ruleName, entry]) => [
      normalizeRuleName(ruleName),
      normalizeRuleEntry(entry),
    ],
  )

}
