<template>
    <vue-form :url="path('collections/properties')"
              :model="data"
              @submit:success="propertySaved"
              @submit:error="submitError">

        <template slot-scope="{form, model}">
            <div v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                <div class="form-row">
                    <div class="col-sm-12">
                        <input-text name="name" :label="$t('labels.name')" :form="form" :model="model"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-sm-12">
                        <input-text name="identifier" :label="$t('labels.identifier')" :form="form" :model="model"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-sm-12">
                        <input-select name="type" :label="$t('labels.type')" :form="form" :model="model">
                            <el-option value="0" label="0"></el-option>
                        </input-select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-sm-12">
                        <input-select name="editable_for_role" :label="$t('labels.editable_for_role')" :form="form" :model="model">
                            <el-option value="0" label="0"></el-option>
                        </input-select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-sm-12">
                        <input-checkbox id="include_in_list_view" name="include_in_list_view" :text="$t('labels.include_in_listview')" :form="form" :model="model"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-sm-12">
                        <input-checkbox id="include_in_json_list_view" name="include_in_json_list_view" :text="$t('labels.include_in_json_listview')" :form="form" :model="model"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-sm-12">
                        <input-checkbox id="translatable" name="translatable" :text="$t('labels.translatable')" :form="form" :model="model"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-sm-12">
                        <input-checkbox id="required" name="required" :text="$t('labels.required')" :form="form" :model="model"/>
                    </div>
                </div>
            </div>

            <div slot="footer" class="dialog-footer text-right">
                <el-button @click="$emit('close')">Annuleren</el-button>
                <el-button type="primary" native-type="submit">Opslaan</el-button>
            </div>
        </template>
    </vue-form>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
            }
        },

        methods: {
            propertySaved({data: property}) {

            }
        }
    }
</script>
