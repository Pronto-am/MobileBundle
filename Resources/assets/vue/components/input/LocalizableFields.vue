<style scoped lang="scss">
    div.fields-container {
        border-bottom: 2px solid #E4E7ED;
        padding-bottom: 5px;
    }
</style>

<template>
    <div class="fields-container">
        <div class="form-row">
            <div class="col-sm-12">
                <el-tabs v-model="activeTab">
                    <el-tab-pane :label="language.name" :name="language.code" :key="language.code" v-for="language of availableLanguages">
                        <div :style="{'padding': '0 20px'}">
                            <slot name="fields" :language="language"></slot>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
