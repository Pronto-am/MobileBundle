<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <vue-form ref="form"
                          :url="path('auth/password/reset')"
                          :model="user"
                          @submit:success="success"
                          @submit:error="submitError">
                    <template slot-scope="{ form, model }">
                        <div v-loading="form.submitting" class="card" element-loading-background="rgba(248,250,252,0.6)">
                            <div class="card-header">{{ $t('titles.forgot_password') }}</div>

                            <div class="card-body">
                                <div class="form-row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <input-text name="email"
                                                        :label="$t('labels.email')"
                                                        :placeholder="$t('labels.email')"
                                                        :model="model"
                                                        :form="form"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer has-buttons">
                                <el-button type="primary" native-type="submit">{{ $t('buttons.reset_password') }}</el-button>
                            </div>
                        </div>
                    </template>
                </vue-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {},
                loading: false
            }
        },

        methods: {
            success() {
                this.$message({
                    message: this.$t('messages.password_reset_email_sent'),
                    type: 'success'
                });

                this.$refs.form.reset();
            },
        }
    }
</script>
