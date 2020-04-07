<style scoped lang="scss">
    @import '../../../scss/layouts/sidebar';
</style>

<template>
    <ul class="menu">
        <li v-for="route of availableRoutes" :key="route.name" v-user-has-role="route.role">
            <div :class="{'router-link-active': routerLinkActive(route), 'router-link-exact-active': routerLinkExactActive(route)}">
                <span @click="navigate(route)"><font-awesome-icon :icon="route.icon"/></span>

                <span @click="navigate(route)" v-html="$t(route.locKey)"></span>

                <span @click="route.submenuOpen = !route.submenuOpen" v-if="route.children !== undefined && route.children.length > 0">
                    <font-awesome-icon icon="angle-left" :class="{'rotate': route.submenuOpen}"/>
                </span>
            </div>

            <ul v-if="route.children !== undefined && route.children.length > 0 && route.submenuOpen" :class="{'open': route.submenuOpen}">
                <li v-for="child in route.children" :key="child.name" v-user-has-role="child.role">
                    <div :class="{'router-link-active': routerLinkActive(child), 'router-link-exact-active': routerLinkExactActive(child)}">
                        <span @click="navigate(child)" v-html="$t(child.locKey)"></span>

                        <span @click="child.submenuOpen = !child.submenuOpen" v-if="child.children !== undefined && child.children.length > 0">
                            <font-awesome-icon icon="angle-left" :class="{'rotate': child.submenuOpen}"/>
                        </span>
                    </div>

                    <ul v-if="child.children !== undefined && child.children.length > 0 && child.submenuOpen" :class="{'open': child.submenuOpen}">
                        <router-link :to="{name: subChild.name}" tag="li" v-for="subChild in child.children" :key="subChild.name" v-html="$t(subChild.locKey)"></router-link>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    import routes from '../../routes/sidebar';

    export default {

        props: {},

        data() {
            return {
                routes: routes
            };
        },

        computed: {
            availableRoutes: function () {
                let routes = this.routes.filter(item => {
                    return this.$auth.userHasRole(item.role);

                }).filter(item => {
                    if(!item.plugins) {
                        return true;
                    }

                    console.debug(this.availablePlugins);
                    console.debug(item.plugins);
                    console.log(this.availablePlugins.filter(plugin => item.plugins.includes(plugin)));

                    // Filter out non-active plugins
                    return this.availablePlugins.filter(plugin => item.plugins.includes(plugin)).length > 0;

                }).map(item => {
                    if (item.children !== undefined) {
                        item.children = item.children.filter(subItem => {
                            return this.$auth.userHasRole(subItem.role);
                        });
                    }

                    return item;
                });

                return routes.sort(function (first, second) {
                    if (first.text < second.text) {
                        return -1;
                    }
                    if (first.text > second.text) {
                        return 1;
                    }

                    return 0;
                });
            },
        },

        methods: {
            /**
             * Determine whether the current route has an active subroute
             */
            routerLinkActive(route) {
                if (this.$route.name === null) {
                    return false;
                }

                // Also open the submenu
                if (this.$route.name.includes(route.name)) {
                    if (route.children !== undefined && route.children.length > 0 && !route.submenuOpen) {
                        route.submenuOpen = true;
                    }

                    return true;
                }

                return false;
            },

            /**
             * Determine whether the current route is active
             */
            routerLinkExactActive(route) {
                if (this.$route.name === null) {
                    return false;
                }

                return this.$route.name === route.name;
            },

            navigate(route) {
                this.$router.push({name: route.name});

                if (route.children !== undefined && route.children.length > 0 && !route.submenuOpen) {
                    route.submenuOpen = true;
                }

                this.sideBarOpen = false;
            },
        }
    }
</script>
