const fs = require('fs')
const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const resolve = dir => path.join(__dirname, '', dir)

const isDevMode = process.env.NODE_ENV === 'development'

const baseUrl = isDevMode ? '/' : './'
const pagesDir = './src/pages'
const entrys = fs.readdirSync(pagesDir)
console.log('页面入口：', entrys)

const pages = entrys.reduce((acc, name) => {
    acc[name] = `${pagesDir}/${name}/main.js`
    return acc
}, {})

// path rewrite: /abc -> /abc.html
const rewrites = entrys.map(name => ({
    from: `/${name}`,
    to: path.posix.join(baseUrl, `${name}.html`),
}))

process.env.VUE_APP_PAGES = JSON.stringify(entrys)

// https://github.com/vuejs/vue-cli/tree/dev/docs/config
module.exports = {
    baseUrl,
    outputDir: 'dist',
    pages,
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: {
            disableDotRule: true,
            rewrites,
        },
    },
    css: {
        loaderOptions: {
            css: {
                localIdentName: isDevMode ? '[folder]-[name]-[local]' : '[hash:5]',
            },
            less: {
                javascriptEnabled: true,
            },
        },
    },
    configureWebpack: config => {
        config.resolve.modules.unshift(resolve('src'))
        config.plugins.push(new LodashModuleReplacementPlugin())
    },
    productionSourceMap: true,
}
