<template>
    <div class="container-fluid">
        <template v-if="$route.meta.auth">
            <header/>

            <main>
                <aside></aside>

                <main>
                    <!--<header/>-->

                    <main>
                        <div class="row">
                            <div class="col-sm-12">
                                <router-view/>
                            </div>
                        </div>
                    </main>

                    <footer/>
                </main>
            </main>
        </template>

        <template v-else>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <router-view/>
                    </div>
                </div>
            </main>
        </template>
    </div>
</template>

<script>
    export default {

        data() {
            return {}
        },

        created() {
            console.log('App.vue created');
        },

        beforeRouteEnter(to, from, next) {
            next();
        },

        methods: {},
    }
</script>
