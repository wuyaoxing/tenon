export default {
    title: 'ud-common',
    type: 'object',
    properties: {
        name: {
            description: '组件名称',
            type: 'string',
            readonly: true,
            format: 'text'
        },
        width: {
            description: '元素宽度',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        height: {
            description: '元素高度',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        minWidth: {
            description: '元素最小宽度',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        minHeight: {
            description: '元素最小高度',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        maxWidth: {
            description: '元素最大宽度',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        maxHeight: {
            description: '元素最大高度',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        x: {
            description: 'x轴偏移量',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        y: {
            description: 'y轴偏移量',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        z: {
            description: 'z序',
            type: 'number',
            minimum: 1,
            format: 'number'
        },
    },
    required: ['name']
}
