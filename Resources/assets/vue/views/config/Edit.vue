<template>
    <div class="row">
        <div class="col-sm-12">
            <vue-form :url="url('config')"
                      :model="item"
                      @submit:success="submitSuccess"
                      @submit:error="submitError">

                <template slot-scope="{form, model}">
                    <div class="card" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                        <div class="card-header">Remote config {{ id ? 'bewerken' : 'toevoegen' }}</div>

                        <div class="card-body">
                            <div class="form-row">
                                <div class="col-sm-12">
                                </div>
                            </div>
                        </div>

                        <div class="card-footer has-buttons">
                            <el-button type="primary" native-type="submit">Opslaan</el-button>
                        </div>
                    </div>
                </template>
            </vue-form>
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

            axios.get(url('config/:id', {id: to.params.id})).then((item) => {
                next(vm => {
                    vm.item = item;
                });
            }).catch(error => {
                next();
            });
        },

        methods: {
        }
    }
</script>
