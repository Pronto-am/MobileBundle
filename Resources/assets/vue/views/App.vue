<!--<style lang="scss">-->
<!--    :root {-->
<!--        &#45;&#45;primary-color: red;-->
<!--        &#45;&#45;primary-color-dark: red;-->
<!--        &#45;&#45;link-color: red;-->
<!--        &#45;&#45;link-color-dark: red;-->
<!--        &#45;&#45;contrast-color: #ffffff;-->
<!--    }-->
<!--</style>-->

<template>
    <div :style="cssVariables">
        <template v-if="$route.meta.layout !== 'front'">
            <header/>

            <main>
                <aside>
                    <side-bar></side-bar>
                </aside>

                <main>
                    <main>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-sm-12">
                                    <router-view/>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer/>
                </main>
            </main>
        </template>

        <template v-else>
            <main>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <router-view/>
                        </div>
                    </div>
                </div>
            </main>
        </template>

        <vue-progress-bar/>
    </div>
</template>

<script>
    import SideBar from './partials/SideBar';

    export default {

        components: {SideBar},

        data() {
            return {
                authenticated: this.$oauth.isAuthenticated(),
                appMounted: false,
            }
        },

        created() {
            // Hook the progress bar to start before we move router-view
            this.$router.beforeEach((to, from, next) => {
                this.authenticated = to.meta.auth;

                //  start the progress bar
                this.$Progress.start();

                next();
            });

            // Hook the progress bar to finish after we've finished moving router-view
            this.$router.afterEach((to, from) => {
                //  finish the progress bar
                this.$Progress.finish();
            });
        },

        mounted() {
            this.$Progress.finish();

            Events.$on('users:authenticated', (user) => {
                this.$auth.init().then(() => {
                    this.authenticated = true;
                });
            });
        },

        computed: {
            appReady: function () {
                if (this.authenticated) {
                    return this.$auth.user !== null;
                } else {
                    return this.appMounted;
                }
            },

            cssVariables: function() {
                return {
                    '--primary-color': this.$application.getApplication().customer.primary_color,
                    '--primary-color-dark': this.$application.getApplication().customer.primary_color_dark,
                    '--link-color': this.$application.getApplication().customer.link_color,
                    '--link-color-dark': this.$application.getApplication().customer.link_color_dark,
                    '--contrast-color': this.$application.getApplication().customer.contrast_color,
                }
            }
        },

        beforeRouteEnter(to, from, next) {
            next();
        },

        methods: {},
    }
</script>
