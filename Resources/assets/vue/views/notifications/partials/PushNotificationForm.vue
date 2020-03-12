<template>
    <vue-form :url="path('notifications')"
              :model="notification"
              @submit:success="submitSuccess"
              @submit:error="submitError">

        <template slot-scope="{form, model}">
            <div v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                <localizable-fields>
                    <template slot="fields" slot-scope="{language}">
                        <div class="form-row">
                            <div class="col-sm-12">
                                <input-text :name="language.code" :label="$t('labels.title')" error-key="title" :form="form" :model="model.title" :disabled="disabled"/>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-sm-12">
                                <input-text :name="language.code" :label="$t('labels.content')" error-key="content" :form="form" :model="model.content" :disabled="disabled"/>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-sm-12">
                                <input-select name="click_action" :label="$t('labels.click_action')" error-key="click_action" :form="form" :model="model" :disabled="disabled">
                                    <el-option :label="$t('labels.click_action_nothing')" :value="0"></el-option>
                                    <el-option :label="$t('labels.click_action_url')" :value="1"></el-option>
                                    <el-option :label="$t('labels.click_action_html')" :value="2"></el-option>
                                </input-select>
                            </div>
                        </div>

                        <div class="form-row" v-if="model.click_action === 1">
                            <div class="col-sm-12">
                                <input-text :name="language.code" :label="$t('labels.click_action_url')" error-key="click_action_url" :form="form" :model="model.click_action_url" :disabled="disabled"/>
                            </div>
                        </div>

                        <div class="form-row" v-else-if="model.click_action === 2">
                            <div class="col-sm-12">
                                <input-editor :name="language.code" :label="$t('labels.click_action_html')" error-key="click_action_html" :form="form" :model="model.click_action_html" :disabled="disabled"/>
                            </div>
                        </div>
                    </template>
                </localizable-fields>

                <div class="card-body">
                    <div class="form-row margin-bottom-sm">
                        <div class="col-sm-12">
                            <input-select name="segment_id" :label="$t('labels.segment')" :form="form" :model="model" :disabled="disabled">
                                <el-option :label="$t('labels.all_registered_devices')" :value="null"></el-option>
                                <el-option :label="segment.name | translatable" :value="segment.id" :key="segment.id" v-for="segment of segments"></el-option>
                            </input-select>
                        </div>
                    </div>

                    <div class="row margin-bottom-sm">
                        <div class="col-sm-12">
                            <h2 v-html="$t('titles.schedule_notification')"></h2>
                        </div>
                    </div>

                    <div class="margin-bottom-lg">
                        <div class="form-row">
                            <div class="col-sm-12">
                                <input-checkbox id="scheduled" :text="$t('labels.schedule_notification')" name="scheduled" :form="form" :model="model" :disabled="disabled"/>
                            </div>
                        </div>

                        <div class="form-row" v-show="model.scheduled">
                            <div class="col-sm-12">
                                <input-datetime type="date"
                                                name="scheduled_sending"
                                                :label="$t('labels.scheduled_sending_date')"
                                                :form="form"
                                                :model="model"
                                                :disabled="disabled"/>
                            </div>
                        </div>
                    </div>

                    <div class="row margin-bottom-sm">
                        <div class="col-sm-12">
                            <h2 v-html="$t('titles.send_to_test_devices')"></h2>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="col-sm-12">
                            <input-checkbox id="test" :text="$t('labels.send_to_test_devices')" name="test" :form="form" :model="model" :disabled="disabled"/>
                        </div>
                    </div>

                    <div class="row" v-show="model.test">
                        <div class="col-sm-12">
                            <el-table ref="testDevicesTable" :data="testDevices" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="name" :label="$t('labels.name')"></el-table-column>
                                <el-table-column prop="model" :label="$t('labels.model')"></el-table-column>
                                <el-table-column prop="platform" :label="$t('labels.platform')"></el-table-column>
                                <el-table-column prop="os_version" :label="$t('labels.os_version')"></el-table-column>
                                <el-table-column prop="app_version" :label="$t('labels.app_version')"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>

                <div class="card-footer has-buttons" v-if="!disabled">
                    <el-button type="primary" native-type="submit">{{ $t('buttons.save') }}</el-button>
                </div>
            </div>
        </template>
    </vue-form>
</template>

<script>
    export default {
        props: {
            notification: {
                type: Object,
                required: true,
            },
            segments: {
                type: Array,
                required: true,
            },
            testDevices: {
                type: Array,
                required: true,
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            }
        },

        data() {
            return {
                selectedTestDevices: [],
            }
        },

        mounted() {
            this.selectedTestDevices.forEach(row => {
                this.$refs.testDevicesTable.toggleRowSelection(row);
            })
        },

        methods: {
            handleSelectionChange(selected) {
                this.selectedTestDevices = selected;
            }
        }
    }
</script>
