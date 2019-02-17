export default {
    title: 'Tabs',
    type: 'object',
    properties: {
        tabs: {
            description: 'tabs 标签页',
            type: 'string',
            format: 'tabs'
        },
        selected: {
            description: 'tabs 高亮标签',
            type: 'string',
            format: 'select'
        },
    },
}
