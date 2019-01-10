const commonSchema = {
    title: 'common',
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
        }
    },
    required: ['name']
}

const widthSchema = {
    title: 'width',
    type: 'object',
    properties: {
        width: {
            description: '元素宽度',
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
        maxWidth: {
            description: '元素最大宽度',
            type: 'number',
            minimum: 0,
            format: 'number'
        }
    }
}

const heightSchema = {
    title: 'height',
    type: 'object',
    properties: {
        height: {
            description: '元素高度',
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
        maxHeight: {
            description: '元素最大高度',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
    }
}

const marginSchema = {
    title: 'margin',
    type: 'object',
    properties: {
        marginTop: {
            description: '上',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        marginRight: {
            description: '右',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        marginBottom: {
            description: '下',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        marginLeft: {
            description: '左',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
    }
}

const paddingSchema = {
    title: 'padding',
    type: 'object',
    properties: {
        paddingTop: {
            description: '上',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        paddingRight: {
            description: '右',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        paddingBottom: {
            description: '下',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        paddingLeft: {
            description: '左',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
    }
}

const borderSchema = {
    title: 'border',
    type: 'object',
    properties: {
        borderStyle: {
            description: '边框样式',
            type: 'string',
            format: 'text'
        },
        borderWidth: {
            description: '边框宽度',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        borderRadius: {
            description: '边框圆角',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        borderColor: {
            description: '边框颜色',
            type: 'string',
            format: 'color'
        },
    }
}

const positionSchema = {
    title: 'position',
    type: 'object',
    properties: {
        position: {
            description: '定位方式',
            type: 'string',
            format: 'text'
        },
        top: {
            description: '上',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        right: {
            description: '右',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        bottom: {
            description: '下',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        left: {
            description: '左',
            type: 'number',
            minimum: 0,
            format: 'number'
        },
        zIndex: {
            description: 'z序',
            type: 'number',
            minimum: 1,
            format: 'number'
        }
    }
}


export default {
    commonSchema,
    widthSchema,
    heightSchema,
    marginSchema,
    paddingSchema,
    borderSchema,
    positionSchema
}
