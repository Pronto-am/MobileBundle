<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="items">
                <div class="card">
                    <div class="card-table">
                        <vue-table :url="path('notifications')"
                                   :can-delete="false"
                                   :sorting="sorting"
                                   :initial-data="items">

                            <template slot="buttons-left">
                                <el-button type="success" @click="$router.push({name: 'push_notifications.add'})">{{ $t('base.add') }}</el-button>
                            </template>

                            <template slot="header" slot-scope="{sorting, clickHandler}">
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Titel" identifier="title"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Verzonden op" identifier="sent"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Apparaten" identifier="recipient_count"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Statistieken"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Geopend"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" property="title" router-link :to="{name: 'push_notifications.edit', params: {id: row.id}}"></vue-table-column>
                                <vue-table-column :row="row" property="sent" type="datetime"></vue-table-column>
                                <vue-table-column :row="row" property="recipient_count"></vue-table-column>
                                <vue-table-column :row="row" type="custom">
                                    <progress-container :label="`${row.success_count} successvol / ${row.failure_count} gefaald`"
                                                        :percentage="100 * row.success_count / row.recipient_count | round"
                                                        :style="{'padding-top': '5px', 'width': '250px'}"></progress-container>
                                </vue-table-column>
                                <vue-table-column :row="row" type="custom">
                                    <progress-container :label="`${row.opened_count} geopend`"
                                                        :percentage="100 * row.opened_count / row.success_count | round"
                                                        :style="{'padding-top': '5px', 'width': '200px'}"></progress-container>
                                </vue-table-column>
                            </template>

                        </vue-table>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    const defaultSorting = {
        column: 'sent',
        order: 'desc'
    };

    export default {
        data() {
            return {
                items: null,
                sorting: defaultSorting
            }
        },

        beforeRouteEnter(to, from, next) {
            axios.get(path('notifications'), {
                params: {
                    sort: defaultSorting
                }
            }).then(({data: {data: plugins}}) => {
                next(vm => {
                    vm.items = plugins;
                })
            }).catch(error => {
                next();
            });
        },

        methods: {},
    }
</script>
