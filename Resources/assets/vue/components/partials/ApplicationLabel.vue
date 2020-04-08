<style scoped lang="scss">
    @import '../../../scss/mixins';

    .application-label {
        @include default-border-radius();
        display: inline-block;
        height: 24px;
        padding: 0 6px;
        line-height: 24px;
        font-size: 12px;
        box-sizing: border-box;
        white-space: nowrap;
    }
</style>

<template>
    <span class="application-label" :style="{'background-color': backgroundColor, 'color': textColor}">
        <slot></slot>
    </span>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                required: false,
            }
        },

        data() {
            return {
                backgroundColor: '#' + (this.color ? this.color : '#409eff').replace('#', ''),
            }
        },

        computed: {
            // backgroundColor: function() {
            //     return '#' + (this.color ? this.color : '#409eff').replace('#', '');
            // },

            textColor: function() {
                let hexcolor = this.backgroundColor.replace('#', '');
                let r = parseInt(hexcolor.substr(0,2),16);
                let g = parseInt(hexcolor.substr(2,2),16);
                let b = parseInt(hexcolor.substr(4,2),16);
                let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

                return (yiq >= 134) ? '#000000' : '#ffffff';
            }
        }
    }
</script>
