<template>
    <div>
        <div class="form-row" v-if="label">
            <div class="col-sm-12">
                <b v-html="label"></b>
            </div>
        </div>

        <div class="form-row">
            <div class="col-sm-12">
                <el-tabs v-model="activeTab">
                    <el-tab-pane :label="language.name" :name="language.code" :key="language.code" v-for="language of availableLanguages">
                        <component :is="type" :name="language.code" :errorKey="errorKey" :form="form" :model="model"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                required: false,
                default: 'input-text'
            },

            form: {
                required: true
            },

            model: {
                required: true
            },

            label: {
                required: false,
                type: String,
            },

            errorKey: {
                required: false,
            }
        },

        data() {
            return {
                activeTab: null,
            }
        },

        created() {
            this.activeTab = this.availableLanguages[0].code;
        }
    }
</script>
