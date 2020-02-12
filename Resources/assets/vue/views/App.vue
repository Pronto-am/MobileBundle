<template>
    <div>
        <template v-if="authenticated">
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
            console.log('App.vue created');
        },

        mounted() {
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
            }
        },

        beforeRouteEnter(to, from, next) {
            next();
        },

        methods: {},
    }
</script>
