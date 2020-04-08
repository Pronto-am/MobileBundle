<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <div class="card">
                <el-tabs v-model="activeTab">
                    <el-tab-pane :label="$t('titles.edit')" name="edit">
                        <edit-tab :item="item"></edit-tab>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('titles.properties')" name="properties">
                        <push-notifications-tab :item="item"></push-notifications-tab>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('titles.relationships')" name="relationships">
                        <push-notifications-tab :item="item"></push-notifications-tab>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import EditTab from "./tabs/EditTab";

    export default {

        components: {EditTab},

        props: {
            id: {
                required: false,
                default: null
            }
        },

        data() {
            return {
                item: null,
                activeTab: 'edit'
            }
        },

        beforeRouteEnter(to, from, next) {
            if(!to.params.id) {
                next();
                return;
            }

            axios.get(path('collections/:id', {id: to.params.id})).then((item) => {
                next(vm => {
                    vm.item = item;
                });
            }).catch(error => {
                next();
            });
        },

        methods: {
        }
    }
</script>
