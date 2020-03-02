<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="items">
                <div class="card">
                    <div class="card-table">
                        <vue-table :url="path('versions')"
                                   :can-delete="$auth.userHasRole($auth.roles.SUPER_ADMIN)"
                                   :sorting="sorting"
                                   :initial-data="items">

                            <template slot="buttons-left">
                                <el-button type="success" v-if="$auth.userHasRole($auth.roles.SUPER_ADMIN)" @click="$router.push({name: 'app_versions.add'})">Toevoegen</el-button>
                            </template>

                            <template slot="header" slot-scope="{sorting, clickHandler}">
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Versie" identifier="version"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Release datum" identifier="release_date"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Platform" identifier="platform"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" property="version" router-link :to="{name: 'app_versions.edit', params: {id: row.id}}"></vue-table-column>
                                <vue-table-column :row="row" property="release_date" type="date"></vue-table-column>
                                <vue-table-column :row="row" property="platform"></vue-table-column>
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
            axios.get(path('versions')).then(({data: {data: plugins}}) => {
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
