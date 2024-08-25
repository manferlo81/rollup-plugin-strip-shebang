import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import { config, configs as typescriptConfigs } from 'typescript-eslint';

const rule = (options) => ['error', options];

const pluginRules = (pluginName, rules) => Object.keys(rules).reduce((output, ruleName) => {
  const pluginRuleName = `${pluginName}/${ruleName}`;
  const ruleValue = rules[ruleName];
  return { ...output, [pluginRuleName]: ruleValue };
}, {});

const eslintRules = {
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
};

const stylisticRules = pluginRules('@stylistic', {
  semi: rule('always'),
  indent: rule(2),
  quotes: rule('single'),
  'linebreak-style': rule('unix'),

  'quote-props': rule('as-needed'),
  'arrow-parens': rule('always'),
  'brace-style': rule('1tbs'),

  'member-delimiter-style': rule({}),
  'padded-blocks': 'off',
});

const typescriptPluginConfig = config(
  ...typescriptConfigs.strictTypeChecked,
  ...typescriptConfigs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  { files: ['*.{js,cjs,mjs}'], ...typescriptConfigs.disableTypeChecked },
);

export default config(
  { ignores: ['dist', 'coverage'] },
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  ...typescriptPluginConfig,
  stylistic.configs['recommended-flat'],
  { rules: { ...eslintRules, ...stylisticRules } },
);
