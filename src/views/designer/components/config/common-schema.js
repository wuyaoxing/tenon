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

const sizeSchema = {
    title: 'size',
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

const positionSchema = {
    title: 'position',
    type: 'object',
    properties: {
        position: {
            description: '定位方式',
            type: 'string',
            enum: [
                {
                    text: '相对定位 - relative',
                    value: 'relative'
                },
                {
                    text: '绝对定位 - absolute',
                    value: 'absolute'
                },
                {
                    text: '固定定位 - fixed',
                    value: 'fixed'
                },
                {
                    text: '无定位 - static',
                    value: 'static'
                },
            ],
            format: 'select',
        },
        top: {
            description: '上',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        right: {
            description: '右',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        bottom: {
            description: '下',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        left: {
            description: '左',
            type: 'string',
            minimum: 0,
            format: 'text',
        },
        zIndex: {
            description: 'z序',
            type: 'number',
            minimum: 1,
            format: 'number',
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
            enum: [
                {
                    text: '常规字体 - normal',
                    value: 'normal'
                },
                {
                    text: '斜体字体 - italic',
                    value: 'italic'
                },
                {
                    text: '倾斜体字体 - oblique',
                    value: 'oblique'
                }
            ],
            format: 'select',
        },
        fontWeight: {
            description: '字体粗细',
            type: 'string',
            enum: [
                {
                    text: '100 - Thin',
                    value: '100'
                },
                {
                    text: '200 - Extra Light',
                    value: '200'
                },
                {
                    text: '300 - Light',
                    value: '300'
                },
                {
                    text: '400 - Normal',
                    value: '400'
                },
                {
                    text: '500 - Medium',
                    value: '500'
                },
                {
                    text: '600 - Semi Bold',
                    value: '600'
                },
                {
                    text: '700 - Bold',
                    value: '700'
                },
                {
                    text: '800 - Extra Bold',
                    value: '800'
                },
                {
                    text: '900 - Black',
                    value: '900'
                },
                {
                    text: 'Lighter',
                    value: 'lighter'
                },
                {
                    text: 'Bolder',
                    value: 'bolder'
                },
            ],
            format: 'select',
        },
        fontSize: {
            description: '字体大小',
            type: 'string',
            format: 'text',
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
        textDecoration: {
            description: '文本排版',
            type: 'string',
            enum: [
                {
                    text: 'none',
                    value: 'none',
                },
                {
                    text: 'underline',
                    value: 'underline',
                },
                {
                    text: 'overline',
                    value: 'overline',
                },
                {
                    text: 'line-through',
                    value: 'line-through',
                }
            ],
            format: 'select',
        },
        color: {
            description: '颜色',
            type: 'string',
            format: 'color',
        },
    },
}

const shadowSchema = {
    title: 'shadow',
    type: 'object',
    properties: {
        boxShadow: {
            description: '边框阴影',
            type: 'string',
            format: 'text',
        },
        textShadow: {
            description: '文字阴影',
            type: 'string',
            format: 'text',
        },
    },
}

const borderSchema = {
    title: 'border',
    type: 'object',
    properties: {
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
        borderStyle: {
            description: '边框样式',
            type: 'string',
            enum: [
                {
                    text: 'none',
                    value: 'none'
                },
                {
                    text: 'solid',
                    value: 'solid'
                },
                {
                    text: 'dashed',
                    value: 'dashed'
                },
                {
                    text: 'dotted',
                    value: 'dotted'
                },
                {
                    text: 'double',
                    value: 'double'
                },
            ],
            format: 'select',
        },
        borderColor: {
            description: '边框颜色',
            type: 'string',
            format: 'color',
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
            format: 'text',
        },
        backgroundClip: {
            description: 'background clip',
            type: 'string',
            enum: [
                {
                    text: 'border-box',
                    value: 'border-box'
                },
                {
                    text: 'padding-box',
                    value: 'padding-box'
                },
                {
                    text: 'content-box',
                    value: 'content-box'
                },
                {
                    text: 'text',
                    value: 'text'
                }
            ],
            format: 'select',
        },
        backgroundOrigin: {
            description: 'background origin',
            type: 'string',
            enum: [
                {
                    text: 'border-box',
                    value: 'border-box'
                },
                {
                    text: 'padding-box',
                    value: 'padding-box'
                },
                {
                    text: 'content-box',
                    value: 'content-box'
                }
            ],
            format: 'autocomplete',
        },
        backgroundPosition: {
            description: 'background position',
            type: 'string',
            enum: [
                {
                    text: 'top',
                    value: 'top'
                },
                {
                    text: 'right',
                    value: 'right'
                },
                {
                    text: 'bottom',
                    value: 'bottom'
                },
                {
                    text: 'left',
                    value: 'left'
                },
                {
                    text: 'center',
                    value: 'center'
                },
                {
                    text: 'center',
                    value: 'center'
                },
            ],
            format: 'autocomplete',
        },
        backgroundRepeat: {
            description: 'background repeat',
            type: 'string',
            enum: [
                {
                    text: 'repeat',
                    value: 'repeat'
                },
                {
                    text: 'repeat-x',
                    value: 'repeat-x'
                },
                {
                    text: 'repeat-y',
                    value: 'repeat-y'
                },
                {
                    text: 'no-repeat',
                    value: 'no-repeat'
                }
            ],
            format: 'select',
        },
        backgroundSize: {
            description: 'background size',
            type: 'string',
            enum: [
                {
                    text: 'auto',
                    value: 'auto'
                },
                {
                    text: 'cover',
                    value: 'cover'
                },
                {
                    text: 'contain',
                    value: 'contain'
                },
                {
                    text: '50% auto',
                    value: '50% auto'
                }
            ],
            format: 'autocomplete',
        },
        backgroundAttachment: {
            description: 'background attachment',
            type: 'string',
            enum: [
                {
                    text: 'scroll',
                    value: 'scroll'
                },
                {
                    text: 'fixed',
                    value: 'fixed'
                },
                {
                    text: 'local',
                    value: 'local'
                }
            ],
            format: 'select',
        },
        backgroundColor: {
            description: 'background color',
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

const styleSchemas = {
    sizeSchema,
    positionSchema,
    marginSchema,
    paddingSchema,
    fontSchema,
    shadowSchema,
    borderSchema,
    backgroundSchema,
    displaySchema,
}

export {
    commonSchema,
    styleSchemas
}

const unitList = [
    {
        text: 'px',
        value: 'px'
    },
    {
        text: '%',
        value: '%'
    },
    {
        text: 'rem',
        value: 'rem'
    },
    {
        text: 'em',
        value: 'em'
    },
    {
        text: 'vw',
        value: 'vw'
    },
    {
        text: 'vh',
        value: 'vh'
    },
]

export default {
    rect: {
        title: 'rect',
        type: 'object',
        properties: {
            width: {
                type: 'string',
                minimum: 0,
                format: 'cssunit',
                enum: unitList
            },
            height: {
                type: 'string',
                minimum: 0,
                format: 'cssunit',
                enum: unitList
            },
            left: {
                type: 'string',
                format: 'cssunit',
                enum: unitList
            },
            top: {
                type: 'string',
                format: 'cssunit',
                enum: unitList
            },
            zIndex: {
                type: 'number',
                minimum: 0,
                format: 'cssunit',
            },
        },
    },
    font: {
        title: 'font',
        type: 'object',
        format: 'FontPanel',
        properties: {
            color: {
                description: '颜色',
                type: 'string',
                format: 'color',
            },
            fontFamily: {
                description: '字体',
                type: 'string',
                format: 'text',
            },
            fontSize: {
                description: '字体大小',
                type: 'string',
                minimum: 0,
                format: 'cssunit',
                enum: [
                    {
                        text: 'px',
                        value: 'px'
                    },
                    {
                        text: 'rem',
                        value: 'rem'
                    },
                    {
                        text: 'em',
                        value: 'em'
                    }
                ]
            },
            fontWeight: {
                description: '字体粗细',
                type: 'string',
                enum: [
                    {
                        text: '100 - Thin',
                        value: '100'
                    },
                    {
                        text: '200 - Extra Light',
                        value: '200'
                    },
                    {
                        text: '300 - Light',
                        value: '300'
                    },
                    {
                        text: '400 - Normal',
                        value: '400'
                    },
                    {
                        text: '500 - Medium',
                        value: '500'
                    },
                    {
                        text: '600 - Semi Bold',
                        value: '600'
                    },
                    {
                        text: '700 - Bold',
                        value: '700'
                    },
                    {
                        text: '800 - Extra Bold',
                        value: '800'
                    },
                    {
                        text: '900 - Black',
                        value: '900'
                    },
                    {
                        text: 'Lighter',
                        value: 'lighter'
                    },
                    {
                        text: 'Bolder',
                        value: 'bolder'
                    },
                ],
                format: 'select',
            },
            lineHeight: {
                description: '行高',
                type: 'string',
                minimum: 0,
                format: 'cssunit',
                enum: unitList
            },
            letterSpacing: {
                description: '行间距',
                type: 'string',
                minimum: 0,
                format: 'cssunit',
                enum: unitList
            },
            fontStyle: {
                description: '字体样式',
                type: 'string',
                enum: [
                    {
                        text: '常规字体 - normal',
                        value: 'normal'
                    },
                    {
                        text: '斜体字体 - italic',
                        value: 'italic'
                    },
                    {
                        text: '倾斜体字体 - oblique',
                        value: 'oblique'
                    }
                ],
                format: 'radio',
            },
            textDecoration: {
                description: '文本排版',
                type: 'string',
                enum: [
                    {
                        text: 'none',
                        value: 'none',
                    },
                    {
                        text: 'underline',
                        value: 'underline',
                    },
                    {
                        text: 'overline',
                        value: 'overline',
                    },
                    {
                        text: 'line-through',
                        value: 'line-through',
                    }
                ],
                format: 'radio',
            },
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
                format: 'radio',
            },
        },
    },
    background: {
        title: 'background',
        type: 'object',
        format: 'BackgroundPanel',
        properties: {
            opacity: {
                type: 'number',
                format: 'slider'
            },
            backgroundColor: {
                description: 'background color',
                type: 'string',
                format: 'color',
            },
            backgroundSize: {
                description: 'background size',
                type: 'string',
                enum: [
                    {
                        text: 'auto',
                        value: 'auto'
                    },
                    {
                        text: 'cover',
                        value: 'cover'
                    },
                    {
                        text: 'contain',
                        value: 'contain'
                    }
                ],
                format: 'select',
            },
            backgroundRepeat: {
                description: 'background repeat',
                type: 'string',
                enum: [
                    {
                        text: 'repeat',
                        value: 'repeat'
                    },
                    {
                        text: 'repeat-x',
                        value: 'repeat-x'
                    },
                    {
                        text: 'repeat-y',
                        value: 'repeat-y'
                    },
                    {
                        text: 'no-repeat',
                        value: 'no-repeat'
                    }
                ],
                format: 'select',
            },
        },
    },
    border: {
        title: 'border',
        type: 'object',
        format: 'BorderPanel',
        properties: {
            borderColor: {
                description: '边框颜色',
                type: 'string',
                format: 'color',
            },
            borderStyle: {
                description: '边框样式',
                type: 'string',
                enum: [
                    {
                        text: 'none',
                        value: 'none'
                    },
                    {
                        text: 'solid',
                        value: 'solid'
                    },
                    {
                        text: 'dashed',
                        value: 'dashed'
                    },
                    {
                        text: 'dotted',
                        value: 'dotted'
                    },
                    {
                        text: 'double',
                        value: 'double'
                    },
                ],
                format: 'select',
            },
            borderWidth: {
                description: '边框宽度',
                type: 'string',
                minimum: 0,
                format: 'cssunit',
                enum: [
                    {
                        text: 'px',
                        value: 'px'
                    }
                ]
            },
            borderRadius: {
                description: '边框圆角',
                type: 'string',
                minimum: 0,
                format: 'cssunit',
                enum: [
                    {
                        text: 'px',
                        value: 'px'
                    },
                    {
                        text: '%',
                        value: '%'
                    }
                ]
            },
        },
    },
    padding: {
        title: 'padding',
        type: 'object',
        format: 'BoxPanel',
        properties: {
            paddingTop: {
                description: '上',
                type: 'string',
                format: 'cssunit',
                enum: unitList
            },
            paddingRight: {
                description: '右',
                type: 'string',
                format: 'cssunit',
                enum: unitList
            },
            paddingBottom: {
                description: '下',
                type: 'string',
                format: 'cssunit',
                enum: unitList
            },
            paddingLeft: {
                description: '左',
                type: 'string',
                format: 'cssunit',
                enum: unitList
            }
        }
    },
    margin: {
        title: 'margin',
        type: 'object',
        format: 'BoxPanel',
        properties: {
            marginTop: {
                description: '上',
                type: 'string',
                format: 'cssunit',
                enum: unitList
            },
            marginRight: {
                description: '右',
                type: 'string',
                format: 'cssunit',
                enum: unitList
            },
            marginBottom: {
                description: '下',
                type: 'string',
                format: 'cssunit',
                enum: unitList
            },
            marginLeft: {
                description: '左',
                type: 'string',
                format: 'cssunit',
                enum: unitList
            }
        }
    },
    boxShadow: {
        title: 'boxShadow',
        type: 'object',
        format: 'BoxShadowPanel',
        properties: {
            boxShadow: {
                type: 'string'
            }
        },
    }
}
