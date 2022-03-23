<template>
    <div class="row">
        <div class="col s12">
            <div class="row toolbar">
                <div class="col s6">
                    <h1 class="text-primary" v-html="$t('titles.translations')"></h1>
                </div>
                <div class="col s6 right-align">
                    <a href="/admin/translations/edit" class="btn-floating waves-effect waves-light blue"><i class="fa fa-plus" aria-hidden="true"></i></a>

                    <a href="/admin/translations/upload" class="btn-floating waves-effect waves-light blue-grey lighten-3"><i class="fa fa-upload" aria-hidden="true"></i></a>
                    <a href="/admin/translations/export" class="btn-floating waves-effect waves-light blue-grey lighten-3"><i class="fa fa-download" aria-hidden="true"></i></a>

                    <a href="#!" class="btn-floating waves-effect waves-light red" :class="{'disabled': selection.items.length === 0}" @click="deleteSelection"><i
                        class="fa fa-trash" aria-hidden="true"></i></a>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <div class="card" v-loading="loading" element-loading-background="rgba(248,250,252,0.6)">
                        <div class="card-content" v-infinite-scroll="fetch" infinite-scroll-distance="400px" :infinite-scroll-disabled="infiniteScrollDisabled">
                            <div class="row">
                                <div class="col s12 m6">
                                    <el-select class="browser-default" v-model="filter.order" @change="fetch(true)">
                                        <el-option-group :label="$t('labels.identifier')">
                                            <el-option :label="$t('labels.identifier_ascending')" value="identifier.asc"></el-option>
                                            <el-option :label="$t('labels.identifier_descending')" value="identifier.desc"></el-option>
                                        </el-option-group>
                                        <el-option-group :label="$t('labels.updated_at')">
                                            <el-option :label="$t('labels.updated_at_ascending')" value="updatedAt.asc"></el-option>
                                            <el-option :label="$t('labels.updated_at_descending')" value="updatedAt.desc"></el-option>
                                        </el-option-group>
                                    </el-select>
                                </div>
                                <div class="col s12 m6">
                                    <el-input :placeholder="$t('labels.search_placeholder')" v-model="filter.search"
                                              @input="search"></el-input>
                                </div>
                            </div>
                            <div class="row" v-if="items">
                                <div class="col s12">
                                    <table class="table striped bordered highlight responsive-table">
                                        <thead>
                                        <tr>
                                            <th width="60" class="has-checkbox">
                                                <el-checkbox v-model="selection.all"
                                                             :indeterminate="selection.indeterminate"
                                                             @change="selectAll"></el-checkbox>
                                            </th>
                                            <th width="225" v-html="$t('labels.identifier')"></th>
                                            <th v-html="$t('labels.translations')"></th>
                                        </tr>
                                        </thead>
                                        <tbody style="font-size: 12px;">
                                        <tr v-for="item of items">
                                            <td style="vertical-align: top;">
                                                <el-checkbox :value="selection.items.indexOf(item.id) > -1"
                                                             :key="item.id"
                                                             @change="(checked) => select(checked, item.id)"></el-checkbox>
                                            </td>
                                            <td style="vertical-align: top;">
                                                <p>
                                                    <a :href="'/admin/translations/edit/' + item.id">{{ item.identifier }}</a>
                                                </p>
                                                <p>
                                                    <a href="#" @click="togglePlatform(item, 'android')"
                                                       class="platform"
                                                       :class="{'active': item.android}"><i
                                                        class="fa fa-android"></i></a>
                                                    &nbsp;
                                                    <a href="#" @click="togglePlatform(item, 'ios')" class="platform"
                                                       :class="{'active': item.ios}"><i class="fa fa-apple"></i></a>
                                                    &nbsp;
                                                    <el-tag v-if="item.type !== 'app'" type="info" size="mini">{{ item.type }}</el-tag>
                                                </p>
                                            </td>
                                            <td>
                                                <template v-for="(language, index) of languages">
                                                    <div class="d-flex"
                                                         v-for="translation of item.translations.filter(translation => translation.language === language.code.toLowerCase())">
                                                        <div class="col-auto pt-2">
                                                            <b>{{ language.code.toUpperCase() }}</b>
                                                        </div>
                                                        <div class="col">
                                                            <el-input
                                                                class="toggle-field materialize-textarea"
                                                                type="textarea"
                                                                :autosize="{ minRows: 1, maxRows: 20}"
                                                                :placeholder="$t('labels.translation_placeholder')"
                                                                v-model="translation.text"
                                                                @change="(value) => saveTranslation(item, language, value)"
                                                            ></el-input>
                                                        </div>
                                                        <div class="col-auto">
                                                            <a href="#!" v-if="index > 0"><i class="fa fa-language"></i></a>
                                                        </div>
                                                    </div>
                                                </template>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'translations-index',

    props: {
        languages: {
            type: Array,
            required: true,
        }
    },

    data() {
        return {
            loading: false,
            items: null,
            model: '',
            filter: {
                search: null,
                order: 'identifier.asc',
            },

            selection: {
                items: [],
                all: false,
                indeterminate: false
            },

            pagination: {
                total: 0,
                current_page: 0,
                total_pages: 1,
            }
        }
    },

    computed: {
        infiniteScrollDisabled: function() {
            return this.loading || this.pagination.current_page >= this.pagination.total_pages;
        },
    },

    watch: {
        selection: {
            handler: function () {
                let checked = this.selection.items.length;

                this.selection.all = checked === this.items.length && this.items.length !== 0;
                this.selection.indeterminate = checked !== 0 && checked < this.items.length;
            },
            deep: true
        }
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch(reset = false) {
            this.loading = true;

            if (reset) {
                this.pagination.current_page = 0;
            }

            axios.get('/admin/translations', {
                params: {
                    search: this.filter.search,
                    order: this.filter.order,
                    page: this.pagination.current_page + 1
                }
            }).then(({data: {data: translations, pagination: pagination}}) => {
                if (this.items === null || reset) {
                    this.items = [];
                }

                this.items = this.items.concat(translations.map((item) => {
                    item.translations = this.languages.reduce((result, language) => {
                        let translation = item.translations.find(translation => translation.language.toLowerCase() === language.code.toLowerCase()) ?? {text: null};
                        result.push({
                            language: language.code,
                            text: translation.text
                        });

                        return result;
                    }, []);

                    return item;
                }));

                this.pagination = pagination;

            }).catch(error => {
                console.error(`Error retrieving translations: ${error}`);

            }).finally(_ => this.loading = false);
        },

        search: _.debounce(function () {
            this.fetch(true);
        }, 1000),

        saveTranslation: _.debounce(function (translationKey, language, value) {
            axios.post('/admin/translations/inline', {
                translation_key_id: translationKey.id,
                language: language.code,
                text: value,
            }).then(_ => {
                //
            }).catch(error => {
                console.error(`Error updating translation: ${error}`);
            });
        }, 1000),

        togglePlatform(item, platform) {
            axios.post('/admin/translations/platform', {
                translation_key_id: item.id,
                platform: platform,
                active: !item[platform]
            }).then(_ => {
                item[platform] = !item[platform];

            }).catch(error => {
                console.error(`Error updating platform: ${error}`);
            });
        },

        // Select all visible rows
        selectAll(checked) {
            let selected = [];

            if (checked) {
                this.items.forEach((item) => {
                    selected.push(item.id);
                });
            }

            this.selection.items = selected;
        },

        /**
         * Select a single row
         * @param checked
         * @param value
         */
        select(checked, value) {
            let index = this.selection.items.indexOf(value);

            if (index !== -1) {
                this.selection.items.splice(index, 1);
            } else {
                this.selection.items.push(value);
            }
        },

        deleteSelection() {
            this.$confirm('This will permanently delete the translation key. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.loading = true;

                axios.post('translations/delete', {
                    translations: this.selection.items,
                }).then(response => {
                    // When we're done, refresh the table
                    this.fetch(true);

                }).catch(error => {
                    //
                }).finally(() => {
                    this.selection.items = [];
                    this.loading = false;
                });
            }).catch(_ > {});
        }
    }
}
</script>