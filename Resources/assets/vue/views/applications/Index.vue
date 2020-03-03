<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="items">
                <div class="card">
                    <div class="card-table">
                        <vue-table url="vue.finances"
                                   :can-delete="$auth.userHasRole($auth.roles.SUPER_ADMIN)"
                                   :sorting="sorting"
                                   :initial-data="items">

                            <template slot="buttons-left">
                                <el-button type="success" v-if="$auth.userHasRole($auth.roles.SUPER_ADMIN)" @click="$router.push({name: 'applications.add'})">{{ $t('base.add') }}</el-button>
                            </template>

                            <template slot="header" slot-scope="{sorting, clickHandler}">
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Naam" identifier="name"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Label" identifier="label"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Versies"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" property="name" router-link :to="{name: 'applications.edit', params: {id: row.id}}"></vue-table-column>
                                <vue-table-column :row="row" property="label">
                                    <el-tag>{{ row.label }}</el-tag>
                                </vue-table-column>
                                <vue-table-column :row="row" type="custom">
                                    <template v-if="row.application_versions.length === 1">1 versie</template>
                                    <template v-else>{{ row.application_versions.length }} versies</template>
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
            axios.get(path('applications')).then(({data: applications}) => {
                next(vm => {
                    vm.items = applications;
                })
            }).catch(error => {
                next();
            });
        },

        methods: {},
    }
</script>
