<style lang="scss">
    .progress-container {
        .row {
            .col, .col-auto, .el-progress__text {
                color: #8898aa !important;
                letter-spacing: 1px;
                text-transform: uppercase !important;
                font-size: 11px;
                font-weight: 500;
            }
        }

        .el-progress__text {
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 0;
        }
    }
</style>

<template>
    <div class="progress-container">
        <div class="row">
            <div class="col" v-html="label"></div>
            <div class="col-auto" v-if="percentage === null">
                <span :inner-html.prop="(start + progress) | round"></span> /
                <span style="padding-right: 50px;" :inner-html.prop="target | round"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <el-progress :percentage="progress > 0 ? Math.round((100 * progress) / (target - start)) : 0" :color="colors" v-if="!percentage"></el-progress>
                <el-progress :percentage="percentage" :color="colors" v-else></el-progress>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                required: false
            },

            // If no percentage provided:
            start: {
                type: Number,
                default: null
            },
            progress: {
                type: Number,
                default: null
            },
            target: {
                type: Number,
                default: null
            },

            // Otherwise, use percentage:
            percentage: {
                type: Number,
                default: null
            },

            colors: {
                type: Array,
                required: false,
                default: () => {
                    return [
                        {color: '#dc3545', percentage: 20},
                        {color: '#fd7e14', percentage: 40},
                        {color: '#ffc107', percentage: 60},
                        {color: '#20c997', percentage: 80},
                        {color: '#28a745', percentage: 100},
                    ];
                }
            },
        }
    }
</script>
