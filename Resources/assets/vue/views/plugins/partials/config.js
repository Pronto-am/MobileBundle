export default {
    props: {
        form: {
            required: true,
        },

        model: {
            required: true,
        },

        config: {
            type: [Object, Array],
            required: true,
        }
    }
}
