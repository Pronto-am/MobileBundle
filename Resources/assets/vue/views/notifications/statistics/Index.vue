<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <div class="card">
                <el-tabs v-model="activeTab">
                    <el-tab-pane :label="$t('titles.details')" name="details">
                        <div class="card-header" v-html="$t('titles.push_notification_details')"></div>

                        <push-notification-form :notification="item" :segments="segments" :test-devices="testDevices" disabled></push-notification-form>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('titles.statistics')" name="statistics">
                        <statistics-tab :notification="item"></statistics-tab>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import editMixin from '../mixins/edit-mixin';
    import StatisticsTab from './tabs/StatisticsTab';

    export default {
        mixins: [editMixin],

        components: {StatisticsTab},

        data() {
            return {
                activeTab: 'details',
            }
        },
    }
</script>
