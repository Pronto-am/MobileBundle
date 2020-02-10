<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="plugins">
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4" v-for="plugin of plugins">
                        <div class="card-header" v-html=""></div>
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
                plugins: null,
                sorting: {
                    column: 'due_date',
                    order: 'asc'
                }
            }
        },

        beforeRouteEnter(to, from, next) {
            axios.get(this.$url('plugins')).then(({data: plugins}) => {
                next(vm => {
                    vm.plugins = plugins;
                })
            }).catch(error => {
                next();
            });
        },

        methods: {},
    }
</script>
