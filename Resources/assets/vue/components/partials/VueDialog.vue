<style lang="scss" scoped>
    .dialog-footer {
        margin-top: 30px;
    }
</style>

<template>
    <el-dialog :title="title"
               :visible.sync="visible"
               :before-close="close"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :width="width">

        <component v-if="visible"
                   :is="component"
                   :data="data"
                   :key="key"
                   :extra="extra"
                   @save="save"
                   @delete="deleted"
                   @close="close">

        </component>

    </el-dialog>
</template>

<script>
    export default {
        props: {
            component: {
                type: String,
                required: true
            },

            visible: {
                type: Boolean,
                default: false
            },

            data: {
                type: Object,
                required: true
            },

            title: {
                type: String,
                required: true
            },

            width: {
                type: String,
                required: false,
                default: '30%'
            },

            extra: {
                type: Object,
                required: false
            }
        },

        data() {
            return {
                key: +new Date()
            }
        },

        methods: {
            save(...args) {
                this.key = +new Date();
                this.$emit('save', ...args);
            },

            deleted() {
                this.key = +new Date();
                this.$emit('delete');
            },

            close() {
                this.key = +new Date();
                this.$emit('close');
            }
        }
    }
</script>
