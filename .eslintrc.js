module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'plugin:vue/recommended',
    ],
    rules: {
        'no-debugger': 1,
        'no-alert': 1,
        'no-console': 0,
        indent: [2, 4, { SwitchCase: 1 }],
        semi: ['error', 'never'],
        quotes: [2, 'single', { allowTemplateLiterals: true }],
        'quote-props': [2, 'as-needed'],
        'max-len': ['error', { code: 180 }],
        'linebreak-style': 0,
        'operator-linebreak': ['error', 'before'],
        'padded-blocks': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
        'vue/html-indent': ['error', 4],
        'vue/first-attribute-linebreak': ['error', {
            singleline: 'beside',
            multiline: 'beside'
        }],
        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'never'
        }],
        'vue/html-self-closing': ['error', {
            html: {
                void: 'always',
                normal: 'never',
                component: 'always'
            },
            // svg: 'always',
            // math: 'always'
        }],
        'vue/require-default-prop': 'off',
        'vue/attribute-hyphenation': [2, 'never', { ignore: ['custom-prop'] }],
        'vue/multi-word-component-names': 0,
        'vue/no-mutating-props': 0
    },
}
