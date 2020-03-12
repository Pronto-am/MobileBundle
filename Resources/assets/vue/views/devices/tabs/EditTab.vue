<template>
    <div class="card-body">
        <vue-form :url="path('devices')"
                  :model="item"
                  @submit:success="submitSuccess"
                  @submit:error="submitError">

            <template slot-scope="{form, model}">
                <div class="row" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                    <div class="col-sm-12">
                        <template v-if="$auth.userHasRole($auth.roles.SUPER_ADMIN)">
                            <div class="row margin-bottom-md">
                                <div class="col-sm-12">
                                    <labeled-row :label="$t('labels.id')">
                                        <pre><code>{{ item.id }}</code></pre>
                                    </labeled-row>
                                </div>
                            </div>

                            <div class="row margin-bottom-sm">
                                <div class="col-sm-12">
                                    <labeled-row :label="$t('labels.firebase_token')">
                                        <pre><code>{{ item.firebase_token }}</code></pre>
                                    </labeled-row>
                                </div>
                            </div>
                        </template>

                        <div class="row margin-bottom-lg">
                            <div class="col-sm-12 col-md-6">
                                <labeled-row :label="$t('labels.name')" :text="item.name"></labeled-row>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <labeled-row :label="$t('labels.model')" :text="item.model"></labeled-row>
                            </div>
                        </div>

                        <div class="row margin-bottom-lg">
                            <div class="col-sm-12">
                                <el-table :data="[item]">
                                    <el-table-column :label="$t('labels.platform')" width="180">
                                        <template slot-scope="scope">
                                            {{ scope.row.platform | capitalize }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="manufacturer" :label="$t('labels.manufacturer')"></el-table-column>
                                    <el-table-column prop="os_version" :label="$t('labels.os_version')" width="180"></el-table-column>
                                    <el-table-column prop="app_version" :label="$t('labels.app_version')" width="180"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </vue-form>
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
            return {}
        },

        methods: {}
    }
</script>
