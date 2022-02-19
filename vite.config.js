import { createVuePlugin } from 'vite-plugin-vue2'
import history from 'vite-plugin-history'

import { resolve } from 'path'

const entrys = ['index', 'designer', 'viewer']

// path rewrite: /abc -> /pages/abc.html
const rewrites = entrys.map(name => ({
    from: `/${name}`,
    to: `./pages/${name}/index.html`
})).concat({
    from: /^\/$/,
    to: './pages/index/index.html'
})

const pages = entrys.reduce((acc, val) => {
    acc[val] = resolve(__dirname, `pages/${val}/index.html`)
    return acc
}, {})

const isDevMode = process.env.NODE_ENV === 'development'
const base = isDevMode ? '/' : './'

// https://vitejs.dev/config/
export default {
    base,
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@pages': resolve(__dirname, './pages'),
        },
    },
    server: {
        open: true,
    },
    build: {
        rollupOptions: {
            input: pages,
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/static/[name]-[hash].[ext]',
            }
        }
    },
    plugins: [
        createVuePlugin(),
        history({
            // logger: console.log.bind(console),
            rewrites
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                additionalData: '@import \'./src/styles/variables.less\';',
                javascriptEnabled: true,
            }
        }
    }
}
