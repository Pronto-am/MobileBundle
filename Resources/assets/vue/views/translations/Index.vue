<template>
    <div class="row">
        <div class="col-sm-12">
            <template v-if="items">
                <div class="card">
                    <div class="card-table">
                        <vue-table :url="path('translations')"
                                   :sorting="sorting"
                                   :filters="filters"
                                   :initial-data="items">

                            <template slot="buttons-left">
                                <el-button type="success" @click="$router.push({name: 'translations.add'})">{{ $t('buttons.add') }}</el-button>
                            </template>

                            <template slot="header" slot-scope="{sorting, clickHandler}">
                                <vue-table-header width="1%" :sorting="sorting" @click="clickHandler" :label="$t('labels.key')" identifier="identifier"></vue-table-header>
                                <vue-table-header :label="$t('labels.translations')"></vue-table-header>
                            </template>

                            <template slot="row" slot-scope="{row}">
                                <vue-table-column :row="row" type="custom">
                                    <div>
                                        <router-link :to="{name: 'translations.edit', params: {id: row.id}}" v-html="row.identifier"></router-link>
                                    </div>
                                </vue-table-column>
                                <vue-table-column :row="row" type="custom">
                                    <div class="container-fluid">
                                        <translation-row v-for="language of availableLanguages"
                                                         :key="language.code"
                                                         :language="language"
                                                         :translation-key="row"></translation-row>
                                    </div>
                                </vue-table-column>
                            </template>

                        </vue-table>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import TranslationRow from "./assets/TranslationRow";

    export default {

        components: {TranslationRow},

        data() {
            return {
                items: null,
                sorting: {
                    column: 'key',
                    order: 'asc'
                },
                filters: {
                    page_count: 200,
                }
            }
        },

        beforeRouteEnter(to, from, next) {
            axios.get(path('translations'), {
                params: {
                    filters: {
                        page_count: 200,
                    }
                }
            }).then(({data: translationKeys}) => {
                next(vm => {
                    vm.items = translationKeys;
                })
            }).catch(error => {
                next();
            });
        },

        methods: {},
    }
</script>
