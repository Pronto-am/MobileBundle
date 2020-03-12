<template>
    <div class="card-table">
        <vue-table :can-delete="false" hide-checkboxes :initial-data="items" v-if="items">
            <template slot="header" slot-scope="{sorting, clickHandler}">
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.title')" identifier="title"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.sent')" identifier="sent"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.successful')"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.error_message')"></vue-table-header>
                <vue-table-header :sorting="sorting" @click="clickHandler" :label="$t('labels.opened')"></vue-table-header>
            </template>

            <template slot="row" slot-scope="{row}">
                <vue-table-column :row="row" type="custom">
                    <router-link :to="{name: 'push_notifications.edit', params: {id: row.id}}" v-html="$options.filters.translatable(row.title)"/>
                </vue-table-column>
                <vue-table-column :row="row" property="sent" type="datetime"></vue-table-column>
                <vue-table-column :row="row" type="custom">
                    <font-awesome-icon icon="check" v-if="row.sent"></font-awesome-icon>
                </vue-table-column>
                <vue-table-column :row="row" identifier="description"></vue-table-column>
                <vue-table-column :row="row" type="custom">
                    <font-awesome-icon icon="check" v-if="row.opened !== null"></font-awesome-icon>
                </vue-table-column>
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

        created() {
            this.getItems();
        },

        methods: {
            getItems() {
                axios.get(path('notifications/list'), {
                    params: {
                        filters: {
                            device_id: this.item.id,
                        }
                    }
                }).then(({data: {data: notifications}}) => {
                    this.items = notifications;
                }).catch(error => {
                    //
                });
            }
        }
    }
</script>
