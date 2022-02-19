import i18n from '@/i18n'

export default function loadLocaleData(Vue, name) {
    const lang = localStorage.getItem('lang') || navigator.language.toLocaleLowerCase()

    const modules = import.meta.glob('../../src/i18n/**/**.js')

    return Promise.all([modules[`../../src/i18n/${lang}/common.js`](), modules[`../../src/i18n/${lang}/${name}.js`]()]).then(values => {
        const options = { common: values[0].default, [name]: values[1].default }
        Vue.use(i18n, options)
    }).catch(reson => {
        console.log('loadLocaleData: ', reson)
    })
}
