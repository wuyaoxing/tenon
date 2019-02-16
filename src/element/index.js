import './theme/index.css'

import {
    Button, Input, Checkbox, Form, FormItem, Dropdown, DropdownItem, DropdownMenu, Select, Option, Message, MessageBox, Dialog, Switch, Loading, Tree, Collapse, CollapseItem, ColorPicker
} from 'element-ui'

const components = {
    Button,
    Input,
    Checkbox,
    Form,
    FormItem,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Select,
    Option,
    Dialog,
    ISwitch: Switch,
    Loading,
    Tree,
    Collapse,
    CollapseItem,
    ColorPicker
}

export default {
    install(Vue) {
        Object.keys(components).forEach(key => {
            Vue.component(key, components[key])
        })

        Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

        Vue.prototype.$Message = Message
        Vue.prototype.$Prompt = MessageBox.prompt

        Vue.use(Loading.directive)
        Vue.prototype.$Loading = Loading.service
    },
}
