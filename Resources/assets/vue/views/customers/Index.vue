<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="items">
                <div class="card">
                    <div class="card-table">
                        <vue-table :url="path('customers')"
                                   :can-delete="false"
                                   :sorting="sorting"
                                   :initial-data="items">

                            <template slot="buttons-left">
                                <el-button type="success" v-if="$auth.userHasRole($auth.roles.SUPER_ADMIN)" @click="$router.push({name: 'customers.add'})">{{ $t('base.add') }}</el-button>
                            </template>

                            <template slot="header" slot-scope="{sorting, clickHandler}">
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Naam" identifier="company_name"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" property="company_name" router-link :to="{name: 'customers.edit', params: {id: row.id}}"></vue-table-column>
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
            axios.get(path('customers')).then(({data: {data: customers}}) => {
                next(vm => {
                    vm.items = customers;
                })
            }).catch(error => {
                next();
            });
        },

        methods: {},
    }
</script>
