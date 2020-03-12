<template>
    <div class="card-table">
        <vue-table :url="path('devices')" :can-delete="false" hide-checkboxes :initial-data="items" :filters="{segment_id: this.item.id}" v-if="items">
            <template slot="header" slot-scope="{sorting, clickHandler}">
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.name')" identifier="name"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.model')" identifier="model"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.manufacturer')" identifier="manufacturer"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.platform')" identifier="platform"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.system_version')" identifier="os_version"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.app_version')" identifier="app_version"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.logged_in')" identifier="last_login"></vue-table-header>
            </template>

            <template slot="row" slot-scope="{row}">
                <vue-table-column :row="row" property="name" router-link :to="{name: 'devices.edit', params: {id: row.id}}"></vue-table-column>
                <vue-table-column :row="row" property="model"></vue-table-column>
                <vue-table-column :row="row" property="manufacturer"></vue-table-column>
                <vue-table-column :row="row" property="platform"></vue-table-column>
                <vue-table-column :row="row" property="os_version"></vue-table-column>
                <vue-table-column :row="row" property="app_version"></vue-table-column>
                <vue-table-column :row="row" property="last_login" type="datetime"></vue-table-column>
            </template>
        </vue-table>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                required: true,
            }
        },

        data() {
            return {
                items: null,
            }
        },

        watch: {
            'item.id': function () {
                this.getItems();
            }
        },

        created() {
            this.getItems();
        },

        methods: {
            getItems() {
                axios.get(path('devices'), {
                    params: {
                        filters: {
                            segment_id: this.item.id,
                        }
                    }
                }).then(({data: devices}) => {
                    this.items = devices;
                }).catch(error => {
                    //
                });
            }
        }
    }
</script>
