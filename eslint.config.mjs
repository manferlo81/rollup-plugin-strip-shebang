import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import { config, configs as typescriptConfigs } from 'typescript-eslint';

const eslintRules = normalizeRules({
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
  'prefer-template': 'error',
  'no-useless-concat': 'error',
});

const stylisticRules = normalizeRules('@stylistic', {
  indent: 2,
  'linebreak-style': 'unix',
  'no-extra-parens': 'all',
  'no-extra-semi': 'error',
  'padded-blocks': 'off',
});

const stylisticPluginConfig = stylistic.configs.customize({
  semi: true,
  arrowParens: true,
  quotes: 'single',
  quoteProps: 'as-needed',
  braceStyle: '1tbs',
});

const typescriptPluginConfig = config(
  ...typescriptConfigs.strictTypeChecked,
  ...typescriptConfigs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  { files: [`*.{js,cjs,mjs}`], ...typescriptConfigs.disableTypeChecked },
);

export default config(
  { ignores: ['dist', 'coverage'] },
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  ...typescriptPluginConfig,
  stylisticPluginConfig,
  { rules: { ...eslintRules, ...stylisticRules } },
);

function normalizeRuleEntry(entry) {
  if (Array.isArray(entry)) return entry;
  if (['off', 'warn', 'error'].includes(entry)) return entry;
  return ['error', entry];
}

function createNormalizeCallback(pluginName) {
  if (!pluginName) return ([ruleName, ruleEntry]) => [ruleName, normalizeRuleEntry(ruleEntry)];
  const pluginPrefix = `${pluginName}/`;
  const normalizeRuleName = (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName;
    return `${pluginPrefix}${ruleName}`;
  };
  return ([ruleName, ruleEntry]) => [normalizeRuleName(ruleName), normalizeRuleEntry(ruleEntry)];
}

function normalizeRulesObject(rules, pluginName) {
  return Object.fromEntries(
    Object.entries(rules).map(
      createNormalizeCallback(
        pluginName,
      ),
    ),
  );
}

function normalizeRules(pluginOrRules, rules) {
  if (!rules) return normalizeRulesObject(pluginOrRules);
  return normalizeRulesObject(rules, pluginOrRules);
}
