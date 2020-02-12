<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="items">
                <div class="card">
                    <div class="card-table">
                        <vue-table url="vue.finances"
                                   :can-delete="false"
                                   :sorting="sorting"
                                   :initial-data="items">

                            <template slot="header" slot-scope="{sorting, clickHandler}">
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Naam" identifier="plugin.name"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Actief" identifier="active"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" property="plugin.name" router-link :to="{name: 'plugins.edit', params: {id: row.id}}"></vue-table-column>
                                <vue-table-column :row="row" property="active" type="custom">
                                    {{ row.active ? 'Ja' : 'Nee' }}
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
            axios.get(url('plugins')).then(({data: {data: plugins}}) => {
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
