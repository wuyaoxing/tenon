export default {
    title: 'Marquee',
    type: 'object',
    properties: {
        text: {
            type: 'string',
            format: 'text'
        },
        duration: {
            type: 'number',
            format: 'number',
            minimum: 1,
        },
    },
    required: ['text'],
}
