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
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Naam" identifier="name"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" property="name" router-link :to="{name: 'applications.edit', params: {id: row.id}}"></vue-table-column>
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
            axios.get(url('applications')).then(({data: applications}) => {
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
