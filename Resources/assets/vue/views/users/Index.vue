<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="items">
                <div class="card">
                    <div class="card-table">
                        <vue-table :url="path('users')"
                                   :filters="{type: null}"
                                   :can-delete="$auth.userHasRole($auth.roles.ADMIN)"
                                   :sorting="sorting"
                                   :initial-data="items">

                            <template slot="buttons-left">
                                <el-button type="success" v-if="$auth.userHasRole($auth.roles.ADMIN)" @click="$router.push({name: 'users.add'})">Toevoegen</el-button>
                            </template>

                            <template slot="filters" slot-scope="{filters}">
                                <div class="form-group">
                                    <el-select v-model="filters.type">
                                        <el-option :value="null" label="Alle gebruikers"></el-option>
                                        <el-option value="cms" label="CMS gebruikers"></el-option>
                                        <el-option value="app" label="App gebruikers"></el-option>
                                    </el-select>
                                </div>
                            </template>

                            <template slot="header" slot-scope="{sorting, clickHandler}">
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Naam" identifier="last_name"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="Type"></vue-table-header>
                                <vue-table-header :sorting="sorting" @click="clickHandler" label="E-mailadres" identifier="email"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" property="full_name" router-link :to="{name: 'users.edit', params: {id: row.id}}"></vue-table-column>
                                <vue-table-column :row="row" type="custom">
                                    <template v-if="row.app_user"><el-tag>App gebruiker</el-tag></template>
                                    <template v-else><el-tag>CMS gebruiker</el-tag></template>
                                </vue-table-column>
                                <vue-table-column :row="row" property="email"></vue-table-column>
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
            axios.get(path('users')).then(({data: applications}) => {
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
