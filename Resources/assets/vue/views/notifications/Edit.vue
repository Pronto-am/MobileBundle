<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <vue-form :url="path('notifications')"
                      :model="item"
                      @submit:success="submitSuccess"
                      @submit:error="submitError">

                <template slot-scope="{form, model}">
                    <div class="card" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                        <div class="card-header">Push notificatie {{ id ? 'bewerken' : 'toevoegen' }}</div>

                        <div class="card-body">
                            <div class="form-row">
                                <div class="col-sm-12">
                                    <h2 v-html="$options.filters.translatable(item.title)"></h2>
                                    <h3 v-html="$options.filters.translatable(item.content)"></h3>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer has-buttons">
                            <el-button type="primary" native-type="submit">{{ $t('buttons.save') }}</el-button>
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
                item: null,
            }
        },

        beforeRouteEnter(to, from, next) {
            if(!to.params.id) {
                next(vm => vm.item = {});
                return;
            }

            axios.get(path('notifications/:id', {id: to.params.id})).then(({data: {data: item}}) => {
                next(vm => {
                    vm.item = item;
                });
            }).catch(error => {
                console.log(error)
                next();
            });
        },

        methods: {
        }
    }
</script>
