<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="items">
                <div class="card">
                    <div class="card-table">
                        <vue-table :url="path('notifications/segments')"
                                   :can-delete="$auth.userHasRole($auth.roles.SUPER_ADMIN)"
                                   :sorting="sorting"
                                   :initial-data="items">

                            <template slot="buttons-left">
                                <el-button type="success" v-if="$auth.userHasRole($auth.roles.SUPER_ADMIN)" @click="$router.push({name: 'push_notifications.segments.add'})">{{ $t('buttons.add') }}</el-button>
                            </template>

                            <template slot="header" slot-scope="{sorting, clickHandler}">
                                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.name')" identifier="name"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.devices')" identifier="device_count"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" type="custom">
                                    <router-link :to="{name: 'push_notifications.segments.edit', params: {id: row.id}}" v-html="$options.filters.translatable(row.name)"/>
                                </vue-table-column>
                                <vue-table-column :row="row" property="device_count"></vue-table-column>
                            </template>

                        </vue-table>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: null,
                sorting: {
                    column: 'name',
                    order: 'asc'
                }
            }
        },

        beforeRouteEnter(to, from, next) {
            axios.get(path('notifications/segments')).then(({data: {data: segments}}) => {
                next(vm => {
                    vm.items = segments;
                })
            }).catch(error => {
                next();
            });
        },

        methods: {},
    }
</script>
