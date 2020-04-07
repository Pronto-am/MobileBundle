<style lang="scss">
    .row.row-translation {
        .col-auto {
            padding-left: 0;
            padding-right: 0;
            padding-top: 6px;
            font-weight: bold;
        }

        .col {
            padding-right: 0;

            .el-textarea__inner {
                transition: height 0.05s ease;

                &:not(:focus) {
                    height: 31px !important;
                }
            }
        }

        .el-loading-mask {
            .el-loading-spinner {
                margin-top: -10px;

                .circular {
                    height: 20px;
                    width: 20px;
                }
            }
        }
    }
</style>

<template>
    <div class="row row-translation margin-bottom-sm" v-if="model" v-loading="saving" element-loading-background="rgba(248,250,252,0.6)">
        <div class="col-auto" v-html="language.code.toUpperCase()"></div>
        <div class="col">
            <el-input type="textarea"
                      autosize
                      class="toggleable"
                      size="small"
                      :placeholder="$t('labels.translation')"
                      v-model="model.text"
                      @focus="inputFocus"
                      @blur="inputBlur"></el-input>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            translationKey: {
                type: Object,
                required: true,
            },

            language: {
                type: Object,
                required: true,
            }
        },

        data() {
            return {
                autosize: false,
                saving: false,
                model: null
            }
        },

        created() {
            let translation = this.translationKey.translations.filter(translation => translation.language === this.language.code)[0];
            this.model = translation ? translation : {text: ''};
        },

        methods: {
            inputFocus() {
                this.autosize = true;
            },

            inputBlur() {
                this.autosize = false;

                this.save();
            },

            save() {
                this.saving = true;

                axios.post(path('translations/inline'), {
                    translation_key_id: this.translationKey.id,
                    language: this.language.code,
                    text: this.model.text,
                }).then(_ => {
                    //
                }).catch(_ => {

                }).finally(_ => {
                    this.saving = false;
                });
            }
        }
    }
</script>
