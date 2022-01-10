const path = require('path');

module.exports = {
  extends: '@nori-dot-com/eslint-config-nori',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*'],
      rules: {
        '@next/next/no-html-link-for-pages': [
          'error',
          path.join(__dirname, './pages'),
        ],
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'jsdoc/require-returns-type': [0],
        'import/no-extraneous-dependencies': [
          'off',
          {
            packageDir: [
              path.join(__dirname, '../'),
              path.join(__dirname, '.'),
            ],
          },
        ],
        'graphql/named-operations': [
          'error',
          {
            tagName: 'graphql',
          },
        ],
        'graphql/capitalized-type-name': [
          'error',
          {
            tagName: 'graphql',
          },
        ],
        'graphql/no-deprecated-fields': [
          'error',
          {
            tagName: 'graphql',
          },
        ],
        'graphql/template-strings': [
          'error',
          {
            tagName: 'graphql',
            env: 'relay',
          },
        ],
        camelcase: 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'class', format: ['PascalCase'] },

          // Need PascalCase to allow for functional react components that have generics
          // on them. Like:
          //   type MyComponentProps<T> { value: T };
          //   function MyComponent<T>({value}: MyComponentProps<T>) { ... }
          // because unfortunately you can't use generics with arrow functions in tsx files:
          //   const MyComponent = <T>({value}: MyComponentProps<T>) => { ... } //parsing error!
          { selector: 'function', format: ['camelCase', 'PascalCase'] },
          {
            selector: 'variable',
            // Needed to allow for react functional components that
            // are supposed to be CamelCase. Adding the types specifier
            // requires specifying a tsconfig.json file path in parserOptions.project,
            // which gets complicated because we have multiple...
            // types: ['function'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'default',
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
          { selector: 'typeLike', format: ['PascalCase'] },
          {
            selector: 'parameter',
            format: ['camelCase', 'PascalCase'],
          },
          { selector: 'property', format: ['camelCase', 'PascalCase'] },
        ],
      },
    },
  ],
};
