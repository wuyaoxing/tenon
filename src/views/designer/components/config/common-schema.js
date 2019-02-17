const commonSchema = {
    title: 'common',
    type: 'object',
    properties: {
        name: {
            description: '组件名称',
            type: 'string',
            readonly: true,
            format: 'text',
        },
        width: {
            description: '元素宽度',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        height: {
            description: '元素高度',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        minWidth: {
            description: '元素最小宽度',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        minHeight: {
            description: '元素最小高度',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        maxWidth: {
            description: '元素最大宽度',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        maxHeight: {
            description: '元素最大高度',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        x: {
            description: 'x轴偏移量',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        y: {
            description: 'y轴偏移量',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        z: {
            description: 'z序',
            type: 'number',
            minimum: 1,
            format: 'number',
        },
    },
    required: ['name'],
}

const widthSchema = {
    title: 'width',
    type: 'object',
    properties: {
        width: {
            description: '元素宽度',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        minWidth: {
            description: '元素最小宽度',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        maxWidth: {
            description: '元素最大宽度',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
    },
}

const heightSchema = {
    title: 'height',
    type: 'object',
    properties: {
        height: {
            description: '元素高度',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        minHeight: {
            description: '元素最小高度',
            type: 'string',
            format: 'text',
        },
        maxHeight: {
            description: '元素最大高度',
            type: 'string',
            format: 'text',
        },
    },
}

const textSchema = {
    title: 'text',
    type: 'object',
    properties: {
        textAlign: {
            description: '对齐方式',
            type: 'string',
            enum: [
                {
                    text: '左对齐',
                    value: 'left',
                },
                {
                    text: '居中对齐',
                    value: 'center',
                },
                {
                    text: '右对齐',
                    value: 'right',
                },
            ],
            format: 'select',
        },
        color: {
            description: '颜色',
            type: 'string',
            format: 'color',
        },
        lineHeight: {
            description: '行高',
            type: 'string',
            format: 'text',
        },
        letterSpacing: {
            description: '行间距',
            type: 'string',
            format: 'text',
        },
    },
}

const fontSchema = {
    title: 'font',
    type: 'object',
    properties: {
        font: {
            description: 'font',
            type: 'string',
            format: 'text',
        },
        fontFamily: {
            description: '字体',
            type: 'string',
            format: 'text',
        },
        fontStyle: {
            description: '字体样式',
            type: 'string',
            format: 'text',
        },
        fontWeight: {
            description: '字体粗细',
            type: 'string',
            format: 'text',
        },
        fontSize: {
            description: '字体大小',
            type: 'string',
            format: 'text',
        },
    },
}

const marginSchema = {
    title: 'margin',
    type: 'object',
    properties: {
        margin: {
            description: 'margin',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        marginTop: {
            description: '上',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        marginRight: {
            description: '右',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        marginBottom: {
            description: '下',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        marginLeft: {
            description: '左',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
    },
}

const paddingSchema = {
    title: 'padding',
    type: 'object',
    properties: {
        padding: {
            description: 'padding',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        paddingTop: {
            description: '上',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        paddingRight: {
            description: '右',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        paddingBottom: {
            description: '下',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        paddingLeft: {
            description: '左',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
    },
}

const backgroundSchema = {
    title: 'background',
    type: 'object',
    properties: {
        background: {
            description: 'background',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        backgroundColor: {
            description: 'background color',
            type: 'string',
            minimum: 0,
            format: 'color',
        },
        backgroundRepeat: {
            description: 'background repeat',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        backgroundSize: {
            description: 'background size',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
    },
}

const borderSchema = {
    title: 'border',
    type: 'object',
    properties: {
        borderStyle: {
            description: '边框样式',
            type: 'string',
            format: 'text',
        },
        borderWidth: {
            description: '边框宽度',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        borderRadius: {
            description: '边框圆角',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        borderColor: {
            description: '边框颜色',
            type: 'string',
            format: 'color',
        },
    },
}

const displaySchema = {
    title: 'display',
    type: 'object',
    properties: {
        display: {
            description: 'display type',
            type: 'string',
            format: 'text',
        },
        flex: {
            description: 'flex',
            type: 'string',
            format: 'text',
        },
        flexDirection: {
            description: 'flex direction',
            type: 'string',
            format: 'text',
        },
        flexWrap: {
            description: 'flex wrap',
            type: 'string',
            format: 'text',
        },
        flexFlow: {
            description: 'flex flow',
            type: 'string',
            format: 'text',
        },
        justifyContent: {
            description: 'justify content',
            type: 'string',
            format: 'text',
        },
        alignItems: {
            description: 'align items',
            type: 'string',
            format: 'text',
        },
        alignContent: {
            description: 'align content',
            type: 'string',
            format: 'text',
        },
        flexShrink: {
            description: 'flex shrink',
            type: 'string',
            format: 'text',
        },
        flexBasis: {
            description: 'flex basis',
            type: 'string',
            format: 'text',
        },
    },
}

const positionSchema = {
    title: 'position',
    type: 'object',
    properties: {
        position: {
            description: '定位方式',
            type: 'string',
            format: 'text',
        },
        top: {
            description: '上',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        right: {
            description: '右',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        bottom: {
            description: '下',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        left: {
            description: '左',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        zIndex: {
            description: 'z序',
            type: 'number',
            minimum: 1,
            format: 'number',
        },
    },
}

export default {
    commonSchema,
    widthSchema,
    heightSchema,
    textSchema,
    fontSchema,
    marginSchema,
    paddingSchema,
    backgroundSchema,
    borderSchema,
    displaySchema,
    positionSchema,
}
