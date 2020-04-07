<template>
    <div class="template"
         :style="{
            '--primary-color': this.colors.primary_color,
            '--primary-color-dark': this.colors.primary_color_dark,
            '--link-color': this.colors.link_color,
            '--link-color-dark': this.colors.link_color_dark,
            '--contrast-color': this.colors.contrast_color,
        }">
        <template v-if="$route.meta.layout !== 'front'">
            <fixed-header :threshold="0">
                <div class="template-header">
                    <div>
                        <img src="/bundles/prontomobile/images/logo-login.png" height="65px">
                    </div>

                    <div></div>

                    <div>
                        <locale-changer></locale-changer>
                    </div>
                </div>
            </fixed-header>

            <div class="template-content" :class="{'aside-visible': sideMenuOpen}">
                <aside>
                    <side-bar></side-bar>
                </aside>

                <main>
                    <main>
                        <div class="content">
                            <router-view/>
                        </div>
                    </main>

                    <footer/>
                </main>
            </div>
        </template>

        <template v-else>
            <div class="template-content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <router-view/>
                        </div>
                    </div>
                </div>
            </div>
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
                application: this.$application.getApplication(),
                sideMenuOpen: false,
                colors: {
                    primary: '#7289da',
                    primaryDark: '#667bc4',
                    link: '#99AAB5',
                    linkDark: '#2C2F33',
                    contrast: '#ffffff',
                }
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

            this.$events.$on('application:change', (application) => {
                this.updateTheme(application);
                console.log(this.colors);
            });
            this.updateTheme(this.$application.getApplication());
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
        },

        beforeRouteEnter(to, from, next) {
            next();
        },

        methods: {
            updateTheme(application) {
                this.application = application;

                if (application == null || application.customer == null) {
                    this.colors = {
                        primary: '#7289da',
                        primaryDark: '#667bc4',
                        link: '#99AAB5',
                        linkDark: '#2C2F33',
                        contrast: '#ffffff',
                    };
                    return
                }

                this.colors = {
                    primary: application.customer.primary_color,
                    primaryDark: application.customer.primary_color_dark,
                    link: application.customer.link_color,
                    linkDark: application.customer.link_color_dark,
                    contrast: application.customer.contrast_color,
                };
            }
        },
    }
</script>
