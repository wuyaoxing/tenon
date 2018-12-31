module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', '@vue/airbnb'],
    // https://eslint.org/docs/rules/
    rules: {
        'class-methods-use-this': 'off',
        'no-debugger': 'off',
        'no-console': 0,
        indent: [2, 4, { SwitchCase: 1 }],
        'linebreak-style': 0,
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'operator-linebreak': ['error', 'before'],
        'eol-last': 0,
        'global-require': 0,
        semi: ['error', 'never'],
        'comma-dangle': ['error', 'only-multiline'],
        'no-underscore-dangle': 0,
        'space-before-function-paren': [0, 'always'],
        'keyword-spacing': 0,
        'no-new': 0,
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true,
            },
        ],
        'no-mixed-operators': [
            'error',
            {
                allowSamePrecedence: true,
            },
        ],
        'max-len': ['error', { code: 200 }],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/first': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-duplicates': 'off',
        'vue/html-quotes': ['error', 'double'],
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
}
