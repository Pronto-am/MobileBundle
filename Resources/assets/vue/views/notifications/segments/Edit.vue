<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <div class="card">
                <el-tabs v-model="activeTab">
                    <el-tab-pane :label="$t('titles.edit')" name="edit">
                        <edit-tab :item="item"></edit-tab>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('titles.devices')" name="devices">
                        <devices-tab :item="item"></devices-tab>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import EditTab from './tabs/EditTab';
    import DevicesTab from './tabs/DevicesTab';

    export default {
        components: {EditTab, DevicesTab},

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
                next(vm => vm.item = {});
                return;
            }

            axios.get(path('notifications/segments/:id', {id: to.params.id})).then(({data: {data: item}}) => {
                next(vm => {
                    vm.item = item;
                });
            }).catch(error => {
                next();
            });
        },
    }
</script>
