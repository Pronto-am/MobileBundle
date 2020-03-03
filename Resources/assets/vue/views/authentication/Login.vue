<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <vue-form :model="user"
                          :url="path('auth/login')"
                          @submit:success="authenticated"
                          @submit:error="error">

                    <template slot-scope="{ form, model }">
                        <div v-loading="form.submitting" class="card" element-loading-background="rgba(248,250,252,0.6)">

                            <div class="card-header">{{ $t('titles.login') }}</div>

                            <div class="card-body">
                                <div class="form-row">
                                    <div class="col-sm-12">
                                        <input-text name="email"
                                                    :label="$t('labels.email')"
                                                    :placeholder="$t('labels.email')"
                                                    :model="model"
                                                    :form="form"/>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="col-sm-12">
                                        <input-password name="password"
                                                        :label="$t('labels.password')"
                                                        :placeholder="$t('labels.password')"
                                                        :model="model"
                                                        :form="form"/>
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer">
                                <div class="row">
                                    <div class="col">
                                        <el-button type="primary" native-type="submit">{{ $t('buttons.login') }}</el-button>
                                    </div>

                                    <div class="col-auto">
                                        <el-button type="text" @click="resetPassword()">{{ $t('buttons.reset_password') }}</el-button>
                                    </div>
                                </div>
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
                user: {
                    email: null,
                    password: null,
                },
            }
        },

        methods: {

            authenticated(response) {
                this.$oauth.storeSession(response);
                this.$router.replace({name: 'dashboard'});

                Events.$emit('users:authenticated', response.user);
            },

            error(error) {
                this.user.password = null;

                let message = this.$t('messages.something_went_wrong');

                if (error.status === 422) {
                  message = this.$t('messages.invalid_input');
                }
            },

            resetPassword() {
                this.$router.push({name: 'password.forgot'});
            }
        }
    }
</script>
