<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="items">
                <div class="card">
                    <div class="card-table">
                        <vue-table :url="path('configurations')"
                                   :can-delete="$auth.userHasRole($auth.roles.SUPER_ADMIN)"
                                   :sorting="sorting"
                                   :initial-data="items">

                            <template slot="buttons-left">
                                <el-button type="success" v-if="$auth.userHasRole($auth.roles.SUPER_ADMIN)" @click="$router.push({name: 'remote_config.add'})">Toevoegen</el-button>
                            </template>

                            <template slot="header" slot-scope="{sorting, clickHandler}">
                                <vue-table-header></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Naam" identifier="name"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Key" identifier="key"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Type" identifier="type"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Waarde" identifier="value"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Release datum" identifier="release_date"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" type="custom">
                                    <a href="#!" class="platform" :class="{'active': row.android}"><i class="fa fa-android"></i></a>
                                    <a href="#!" class="platform" :class="{'active': row.ios}"><i class="fa fa-apple"></i></a>
                                </vue-table-column>
                                <vue-table-column :row="row" property="name" router-link :to="{name: 'remote_config.edit', params: {id: row.id}}"></vue-table-column>
                                <vue-table-column :row="row" property="identifier"></vue-table-column>
                                <vue-table-column :row="row" property="type"></vue-table-column>
                                <vue-table-column :row="row" property="value"></vue-table-column>
                                <vue-table-column :row="row" property="release_date" type="date"></vue-table-column>
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
            axios.get(path('configurations')).then(({data: {data: plugins}}) => {
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
