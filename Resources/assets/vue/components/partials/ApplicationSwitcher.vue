<style lang="scss">
    .application-switcher-container {
        .row.el-dropdown-link {
            cursor: pointer;

            .col {
                font-family: "Titillium Web", sans-serif;
                font-size: 14px;
                font-weight: bold;
            }

            .col-auto:nth-child(2) {
                padding: 0 4px 0 10px;
            }
        }
    }
</style>

<template>
    <div class="application-switcher-container">
        <el-dropdown trigger="click" @command="handleCommand">
            <div class="row no-gutters el-dropdown-link">
                <div class="col" v-html="application.name"></div>
                <div class="col-auto">
                    <application-label :color="application.color">{{ application.label.toUpperCase() }}</application-label>
                </div>
                <div class="col-auto">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{application: null, customer: null}">{{ $t('labels.application_overview') }}</el-dropdown-item>
                <template v-for="customer of customers">
                    <el-dropdown-item divided disabled><b>{{ customer.company_name }}</b></el-dropdown-item>

                    <template v-for="application of customer.applications">
                        <template v-if="application.application_versions.length === 1">
                            <el-dropdown-item :command="{application: application, customer: customer}">
                                <div class="row">
                                    <div class="col" v-html="application.name"></div>
                                    <div class="col-auto" v-if="application.label">
                                        <application-label :color="application.color">{{ application.label.toUpperCase() }}</application-label>
                                    </div>
                                </div>
                            </el-dropdown-item>
                        </template>

                        <template v-else>
                            <template v-for="version of application.application_versions">
                                <el-dropdown-item :command="{application: application, customer: customer, version: version}">{{ application.name }} / {{ version.name }}</el-dropdown-item>
                            </template>
                        </template>
                    </template>
                </template>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                customers: [],
                application: this.$application.getApplication(),
            }
        },

        created() {
            this.getApplications();
        },

        methods: {
            getApplications() {
                axios.get(path('customers')).then(({data: {data: customers}}) => {
                    this.customers = customers.sort((a, b) => a.company_name < b.company_name ? -1 : 1);
                }).catch(error => {
                    //
                });
            },

            handleCommand({application: application, customer: customer, version: version = null}) {
                if(application === null) {
                    this.$router.push({name: 'applications.select'});
                    return;
                }

                this.application = application;
                this.$events.$emit('application:change', application, (version ? version : application.application_versions[0]));
                this.$events.$emit('theme:change', customer);
            }
        }
    }
</script>
