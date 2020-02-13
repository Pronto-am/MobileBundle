<template>
    <div class="row">
        <div class="col-sm-12">

        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                required: false,
                default: null
            }
        },

        data() {
            return {
                item: {},
            }
        },

        beforeRouteEnter(to, from, next) {
            if(!to.params.id) {
                next();
                return;
            }
            
            axios.get(path('devices/:id', {id: to.params.id})).then((application) => {
                next(vm => {
                    vm.item = application;
                });
            }).catch(error => {
                next();
            });
        },

        methods: {
        }
    }
</script>
