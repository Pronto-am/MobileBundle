<style scoped lang="scss">
    .card {
        .card-body {
            h1 {
                font-size: 16px;
                color: #a4a4a4;
            }
        }
    }
</style>

<template>
    <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4" v-if="items">
            <div class="card">
                <div class="card-header">Selecteer een applicatie</div>

                <div class="card-body">
                    <div class="row" v-for="company of items">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h1 v-html="company.company_name"></h1>
                                </div>
                            </div>

                            <template v-for="application of company.applications">
                                <div class="row" v-for="version of application.application_versions" @click="select(application, version)">
                                    <div class="col-auto">
                                        <h2 v-html="application.name"></h2>
                                    </div>
                                    <div class="col">
                                        <span v-html="application.label"></span>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            //
        },

        data() {
            return {
                items: null,
            }
        },

        beforeRouteEnter(to, from, next) {
            axios.get(path('customers')).then(({data: {data: customers}}) => {
                next(vm => {
                    vm.items = customers;
                });
            }).catch(error => {
                next();
            });
        },

        methods: {
            select(application, version) {
                this.$application.setApplication(application);
                this.$application.setVersion(version);

                this.$router.push({name: 'dashboard'});
            }
        }
    }
</script>
