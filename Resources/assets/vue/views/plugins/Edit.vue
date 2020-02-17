<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <vue-form :url="path('plugins')"
                      :model="item"
                      @submit:success="submitSuccess"
                      @submit:error="submitError">

                <template slot-scope="{form, model}">
                    <div class="card" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                        <div class="card-header">Plugin bewerken</div>

                        <div class="card-body">
                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-checkbox id="active" name="active" text="Is actief" :form="form" :model="model"/>
                                </div>
                            </div>

                            <component :is="`${item.plugin.identifier.replace('_', '-')}-config`" :form="form" :model="model" :config="item.config" />
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
    import AppUsersConfig from "./partials/AppUsersConfig";
    import AppVersionsConfig from "./partials/AppVersionsConfig";
    import CollectionsConfig from "./partials/CollectionsConfig";
    import NotificationsConfig from "./partials/NotificationsConfig";
    import RemoteConfigConfig from "./partials/RemoteConfigConfig";
    import TranslationsConfig from "./partials/TranslationsConfig";

    export default {
        components: {
            AppUsersConfig,
            AppVersionsConfig,
            CollectionsConfig,
            NotificationsConfig,
            RemoteConfigConfig,
            TranslationsConfig
        },

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
            axios.get(path('plugins/:id', {id: to.params.id})).then(({data: {data: item}}) => {
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
