module.exports = {
    env: {
        browser: true,
        node: true,
    },
    plugins: ['react', '@typescript-eslint'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        // '@typescript-eslint/no-explicit-any': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-unused-vars': ['warn', { vars: 'all', ignoreRestSiblings: false }],
    },
}
