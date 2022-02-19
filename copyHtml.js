const fs = require('fs')
const dirNames = fs.readdirSync('./dist/pages')

for (let i = 0; i < dirNames.length; i++) {
    fs.copyFileSync(`./dist/pages/${dirNames[i]}/index.html`, `./dist/${dirNames[i]}.html`)
}

fs.rmdirSync('./dist/pages', { recursive: true })
