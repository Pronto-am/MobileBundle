<template>
    <div class="container-fluid">
        <div class="row">
            <div v-if="action" class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <vue-form ref="form" :url="path('auth/password/create')" :model="action" @submit:success="login" @submit:error="submitError">
                    <template slot-scope="{ form, model }">
                        <div v-loading="form.submitting" class="card" element-loading-background="rgba(248,250,252,0.6)">
                            <div class="card-header" v-html="$t('titles.create_password')"></div>

                            <div class="card-body">
                                <div class="form-row">
                                    <div class="col-sm-12">
                                        <input-password name="password" :placeholder="$t('labels.password')" :model="model" :form="form"/>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="col-sm-12">
                                        <input-password name="password_confirmation" :placeholder="$t('labels.password_confirmation')" :model="model" :form="form"/>
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer has-buttons">
                                <el-button type="primary" native-type="submit">{{ $t('buttons.create_password') }}</el-button>
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
        props: {
            token: {
                type: String,
                required: true,
            }
        },

        data() {
            return {
                action: null,
                loading: false,
            }
        },

        beforeRouteEnter(to, from, next) {
            axios.get(path('auth/activation/:token', {token: to.params.token})).then(({data: {data: user}}) => {
                next(vm => {
                    vm.action = {
                        token: to.params.token
                    };
                });
            }).catch(error => {
                next(vm => {
                    vm.$router.replace({name: 'login'});
                    vm.$message({
                        message: error.response.data.message,
                        type: 'error'
                    });
                });
            })
        },

        methods: {
            login(response) {
                if (response.access_token) {
                    this.$oauth.storeSession(response);
                    this.$router.replace({name: 'dashboard'});

                    this.$message({
                        message: this.$t('messages.password_changed'),
                        type: 'success'
                    });

                    this.$events.$emit('users:authenticated');
                } else {
                    this.appPasswordChanged = true;
                    this.$refs.form.reset();
                }
            },

            error(error) {
                this.loading = false;

                this.$message({
                    message: error.message,
                    type: 'error'
                });
            }
        }
    }
</script>
