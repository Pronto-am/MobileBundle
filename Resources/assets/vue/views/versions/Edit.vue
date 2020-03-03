<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <vue-form :url="path('versions')"
                      :model="item"
                      @submit:success="submitted"
                      @submit:error="submitError">

                <template slot-scope="{form, model}">
                    <div class="card" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                        <div class="card-header">App versie {{ id ? 'bewerken' : 'toevoegen' }}</div>

                        <div class="card-body">
                            <div class="form-row">
                                <div class="col-sm-12 col-md-6">
                                    <input-text name="version" :label="$t('labels.version')" :form="form" :model="model"/>
                                </div>

                                <div class="col-sm-12 col-md-6">
                                    <input-select name="platform" :label="$t('labels.platform')" :form="form" :model="model">
                                        <el-option label="Android" value="android"></el-option>
                                        <el-option label="iOS" value="ios"></el-option>
                                    </input-select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-datetime format="dd-MM-yyyy"
                                                    type="date"
                                                    value-format="yyyy-MM-dd"
                                                    name="release_date"
                                                    :label="$t('labels.release_date')"
                                                    :form="form"
                                                    :model="model"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <b>Omschrijving</b>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <el-tabs v-model="activeLanguageTab">
                                        <el-tab-pane :label="language.name" :name="language.code" :key="language.code" v-for="language of availableLanguages">
                                            <input-editor :name="language.code" error-key="description" :form="form" :model="model.description"/>
                                        </el-tab-pane>
                                    </el-tabs>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-text type="url" name="url" :label="$t('labels.url')" :form="form" :model="model"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-upload :auto-upload="false"
                                                  :action="path('versions/file')"
                                                  :data="uploadData"
                                                  :headers="{'authorization': $oauth.getAuthHeader()}"
                                                  accept="*/*"
                                                  ref="upload"
                                                  name="file"
                                                  :text="'Sleep hier het gewenste bestand, of <em>klik om een bestand te kiezen</em>'"
                                                  :file-tip="'App'">
                                    </input-upload>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-checkbox id="required" name="required" :label="$t('labels.version_is_required')" :form="form" :model="model"/>
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
                activeLanguageTab: this.$application.getApplication().available_languages.find(x => x !== undefined).code,
                uploadData: {
                    version_id: this.id
                }
            }
        },

        beforeRouteEnter(to, from, next) {
            if(!to.params.id) {
                next(vm => vm.item = {description: {}});
                return;
            }

            axios.get(path('versions/:id', {id: to.params.id})).then(({data: {data: item}}) => {
                next(vm => {
                    vm.item = item;
                });
            }).catch(error => {
                next();
            });
        },

        methods: {
            submitted({data: item}) {
                this.uploadData.version_id = item.id;

                this.$refs.upload.submit().then(response => {
                    //
                }).catch(error => {
                    console.log(error)
                    this.$message({
                        type: 'error',
                        duration: 5000,
                        message: 'Het bestand kon niet geüpload worden, de versie is wel opgeslagen.'
                    })
                }).finally(_ => {
                    this.submitSuccess();

                    if (!this.id) {
                        this.$router.replace({name: 'app_versions.edit', params: {id: item.id}});
                    }
                });
            }
        }
    }
</script>
