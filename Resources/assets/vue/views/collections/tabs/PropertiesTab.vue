<template>
    <div class="card-table">
        <vue-table :initial-data="items" v-if="items">
            <template slot="buttons-left">
                <el-button type="success" @click="openDialog()">{{ $t('buttons.add') }}</el-button>
            </template>

            <template slot="header" slot-scope="{sorting, clickHandler}">
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.name')" identifier="name"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.identifier')" identifier="identifier"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.type')" identifier="type.name"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.include_in_listview')" identifier="include_in_listview"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.required')" identifier="required"></vue-table-header>
            </template>

            <template slot="row" slot-scope="{row}">
                <vue-table-column :row="row" property="name" link :to="{name: 'collections.properties.edit', params: {id: row.id}}" @click="openDialog(row)"></vue-table-column>
                <vue-table-column :row="row" property="identifier"></vue-table-column>
                <vue-table-column :row="row" property="type.type"></vue-table-column>
                <vue-table-column :row="row" type="custom">
                    {{ row.include_in_list_view ? $t('messages.yes') : $t('messages.no') }}
                </vue-table-column>
                <vue-table-column :row="row" type="custom">
                    {{ row.required ? $t('messages.yes') : $t('messages.no') }}
                </vue-table-column>
            </template>
        </vue-table>

        <vue-dialog component="property-dialog"
                    :visible="dialogVisible"
                    :data="property"
                    :title="$t('titles.property')"
                    width="50%"
                    @close="dialogClosed"
                    @save="propertySaved"/>
    </div>
</template>

<script>
    import {Error} from '../../../services/errors.service';

    export default {

        props: {
            item: {
                required: true,
            }
        },

        data() {
            return {
                items: null,
                types: null,
                property: {},
                dialogVisible: false,
                filters: {
                    collection_id: this.item.id,
                },
            }
        },

        created() {
            this.getItems();
        },

        methods: {
            getItems() {
                let calls = [];
                calls.push(axios.get(path('collections/properties/list'), {
                    params: {
                        filters: {
                            collection_id: this.item.id,
                        }
                    }
                }));

                calls.push(axios.get(path('collections/properties/types')));

                axios.all(calls).then(([{data: {data: properties}}, {data: {data: types}}]) => {
                    this.items = properties;
                    this.types = types;

                }).catch(error => {
                    this.$error.notify(Error.unknown);
                });
            },

            openDialog(row = {
                collection_id: this.item.id,
            }) {
                this.property = row;
                this.dialogVisible = true;
            },

            dialogClosed() {
                this.dialogVisible = false;
                this.resetProperty();
            },

            propertySaved(slide) {
                if (slide.type === 1) {
                    this.submitSuccess();
                }

                this.resetProperty();
                this.dialogVisible = false;

                this.$refs.slides.getData();
            },

            resetProperty() {
                this.property = {
                    collection_id_id: this.item.id
                };
            },
        }
    }
</script>
