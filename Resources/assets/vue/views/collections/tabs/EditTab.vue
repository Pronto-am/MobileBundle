<template>
    <div class="card-body">
        <vue-form :url="path('collections')"
                  :model="item"
                  @submit:success="submitSuccess"
                  @submit:error="submitError">

            <template slot-scope="{form, model}">
                <div class="row" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                    <div class="col-sm-12">
                        <div class="form-row">
                            <div class="col-sm-12 col-md-6">
                                <input-text name="name" :label="$t('labels.name')" :form="form" :model="model"></input-text>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <input-text name="identifier" :label="$t('labels.identifier')" :form="form" :model="model" disabled></input-text>
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

        created() {
            console.log(this.item);
        },

        methods: {}
    }
</script>
