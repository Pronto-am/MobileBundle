<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <div class="card">
                <el-tabs v-model="activeTab">
                    <el-tab-pane :label="$t('titles.edit')" name="edit">
                        <edit-tab :item="item"></edit-tab>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('titles.push_notifications')" name="push_notifications">
                        <push-notifications-tab :item="item"></push-notifications-tab>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import EditTab from './tabs/EditTab';
    import PushNotificationsTab from './tabs/PushNotificationsTab';

    export default {
        components: {EditTab, PushNotificationsTab},

        props: {
            id: {
                required: true,
            }
        },

        data() {
            return {
                item: null,
                activeTab: 'edit'
            }
        },

        beforeRouteEnter(to, from, next) {
            axios.get(path('devices/:id', {id: to.params.id})).then(({data: {data: device}}) => {
                next(vm => {
                    vm.item = device;
                });
            }).catch(error => {
                next();
            });
        },

        methods: {}
    }
</script>
