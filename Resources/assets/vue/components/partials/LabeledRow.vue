<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="row margin-bottom-sm">
                <div class="col-sm-12">
                    <b v-html="label"></b>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12" v-html="text" v-if="text"></div>
                <div class="col-sm-12">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                required: true,
            },

            text: {
                required: false,
            }
        }
    }
</script>
