<template>
    <div class="template"
         :style="{
            '--primary-color': this.colors.primary,
            '--primary-color-dark': this.colors.primaryDark,
            '--link-color': this.colors.link,
            '--link-color-dark': this.colors.linkDark,
            '--contrast-color': this.colors.contrast,
        }">
        <template v-if="$route.meta.layout !== 'front'">
            <top-navigation></top-navigation>

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
            <div class="template-content template-content-front">
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
    import TopNavigation from './partials/TopNavigation';

    export default {

        components: {SideBar, TopNavigation},

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

            this.$events.$on('application:change', (application, version) => {
                this.$application.setApplication(application);

                if(version) {
                    this.$application.setVersion(version);
                }

                if(this.$route.name !== 'applications.select') {
                    this.refreshPage();
                }
            });

            this.$events.$on('theme:change', (customer) => {
                this.updateTheme(customer);
                this.refreshPage();
            });

            this.updateTheme(this.application.customer);
        },

        mounted() {
            this.$Progress.finish();

            this.$events.$on('users:authenticated', (user) => {
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
            refreshPage() {
                this.$router.go(0);
            },

            updateTheme(customer) {
                if (customer == null) {
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
                    primary: customer.primary_color,
                    primaryDark: customer.primary_color_dark,
                    link: customer.link_color,
                    linkDark: customer.link_color_dark,
                    contrast: customer.contrast_color,
                };
            }
        },
    }
</script>
