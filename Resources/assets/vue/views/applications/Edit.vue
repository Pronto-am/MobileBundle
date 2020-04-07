<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <vue-form :url="path('applications')"
                      :model="item"
                      @submit:success="saved"
                      @submit:error="submitError">

                <template slot-scope="{form, model}">
                    <div class="card" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                        <div class="card-header">Applicatie {{ id ? 'bewerken' : 'toevoegen' }}</div>

                        <div class="card-body">
                            <div class="form-row">
                                <div class="col-sm-12 col-md-6">
                                    <input-text name="name" :label="$t('labels.name')" :form="form" :model="model"/>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <input-text name="label" :label="$t('labels.label')" :form="form" :model="model"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12 col-md-6">
                                    <input-text name="android_bundle_identifier" :label="$t('labels.android_bundle_identifier')" :form="form" :model="model"/>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <input-text name="ios_bundle_identifier" :label="$t('labels.ios_bundle_identifier')" :form="form" :model="model"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-select name="default_language" :label="$t('labels.default_language')" :form="form" :model="model">
                                        <el-option :label="language.name" :value="language.code" :key="language.code" v-for="language of languages"></el-option>
                                    </input-select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-select name="languages" :label="$t('labels.available_languages')" multiple :form="form" :model="model">
                                        <el-option :label="language.name" :value="language.code" :key="language.code" v-for="language of languages"></el-option>
                                    </input-select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12 col-md-6">
                                    <input-text name="client_id" :label="$t('labels.client_id')" :form="form" :model="oauthClient" disabled/>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <input-text name="secret" :label="$t('labels.client_secret')" :form="form" :model="oauthClient" disabled/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-auto">
                                    <input-color-picker name="color" :form="form" :model="model"/>
                                </div>
                                <div class="col">
                                    <b v-html="$t('labels.color')"></b>
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
                oauthClient: null,
                languages: []
            }
        },

        beforeRouteEnter(to, from, next) {
            let calls = [axios.get(path('applications/languages'))];

            if (to.params.id) {
                calls.push(axios.get(path('applications/:id', {id: to.params.id})));
            }

            axios.all(calls).then((response) => {
                next(vm => {
                    vm.languages = response[0].data.data;

                    if (to.params.id) {
                        vm.item = response[1].data.data;
                        vm.item.languages = vm.item.available_languages.map((language) => {
                            return language.code;
                        });
                        vm.oauthClient = {
                            client_id: vm.item.oauth_clients[0].id + '_' + vm.item.oauth_clients[0].random_id,
                            secret: vm.item.oauth_clients[0].secret,
                        }
                    } else {
                        vm.item = {languages: []};
                        vm.oauthClient = {};
                    }
                });
            }).catch(error => {
                next();
            });
        },

        methods: {
            saved({data: application}) {
                this.submitSuccess();

                if(!this.id) {
                    this.$router.replace({name: 'applications.edit', params: {id: application.id}});
                } else {
                    // Refresh the globally used instance of the application
                    if (application.id === this.$application.getApplication().id) {
                        this.$application.setApplication(application);
                        this.$events.$emit('application:change', application);
                    }
                }
            }
        }
    }
</script>
