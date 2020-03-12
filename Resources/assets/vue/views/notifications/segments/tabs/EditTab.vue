<template>
    <div class="card-body">
        <vue-form :url="path('notifications/segments')"
                  :model="item"
                  @submit:success="submitSuccess"
                  @submit:error="submitError">

            <template slot-scope="{form, model}">
                <div class="row" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                    <div class="col-sm-12">
                        <localizable-text-field :form="form" :model="model.name" :label="$t('labels.name')" error-key="name"></localizable-text-field>

                        <div class="row">
                            <div class="col-sm-12">
                                <el-button type="primary" native-type="submit">{{ $t('buttons.save') }}</el-button>
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
            return {
                //
            }
        },
    }
</script>
