module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-console': 'warn',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'object-curly-newline': 'off',
    'jsx-a11y/no-static-element-interactions': ['error', { allowExpressionValues: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'import/no-cycle': [2, { maxDepth: 1 }],
    'operator-linebreak': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
