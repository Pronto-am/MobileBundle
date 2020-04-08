<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <vue-form :url="path('customers')"
                      :model="item"
                      @submit:success="submitted"
                      @submit:error="submitError">

                <template slot-scope="{form, model}">
                    <div class="card" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                        <div class="card-header">Klant {{ id ? 'bewerken' : 'toevoegen' }}</div>

                        <div class="card-body">
                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-text name="company_name" :label="$t('labels.name')" :form="form" :model="model"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-text name="contact_person" :label="$t('labels.contact_person')" :form="form" :model="model"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-text name="phone_number" :label="$t('labels.phone_number')" :form="form" :model="model"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-text name="email" :label="$t('labels.email')" :form="form" :model="model"/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <div class="form-row">
                                        <div class="col">
                                            <b v-html="$t('labels.primary_color')"></b>
                                        </div>
                                        <div class="col-auto">
                                            <input-color-picker name="primary_color" :form="form" :model="model"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-md-6">
                                    <div class="form-row">
                                        <div class="col">
                                            <b v-html="$t('labels.primary_color_dark')"></b>
                                        </div>
                                        <div class="col-auto">
                                            <input-color-picker name="primary_color_dark" :form="form" :model="model"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-md-6">
                                    <div class="form-row">
                                        <div class="col">
                                            <b v-html="$t('labels.link_color')"></b>
                                        </div>
                                        <div class="col-auto">
                                            <input-color-picker name="link_color" :form="form" :model="model"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-md-6">
                                    <div class="form-row">
                                        <div class="col">
                                            <b v-html="$t('labels.link_color_dark')"></b>
                                        </div>
                                        <div class="col-auto">
                                            <input-color-picker name="link_color_dark" :form="form" :model="model"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-md-6">
                                    <div class="form-row">
                                        <div class="col">
                                            <b v-html="$t('labels.contrast_color')"></b>
                                        </div>
                                        <div class="col-auto">
                                            <input-color-picker name="contrast_color" :form="form" :model="model"/>
                                        </div>
                                    </div>
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
            if (!to.params.id) {
                next(vm => vm.item = {});
                return;
            }

            axios.get(path('customers/:id', {id: to.params.id})).then(({data: {data: item}}) => {
                next(vm => {
                    vm.item = item;
                    console.log(vm.item)
                });
            }).catch(error => {
                next();
            });
        },

        methods: {
            submitted({data: item}) {
                this.submitSuccess();

                if (!this.id) {
                    this.$router.replace({name: 'customers.edit', params: {id: item.id}});
                }
            }
        }
    }
</script>
