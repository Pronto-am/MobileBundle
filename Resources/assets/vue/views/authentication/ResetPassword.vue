<template>
    <div class="container-fluid">
        <div class="row">
            <div v-if="action" class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <vue-form ref="form" :url="$path('vue.password.reset')" @submit:success="login" @submit:error="submitError">
                    <template slot-scope="{ form, model }">
                        <div v-loading="form.submitting" class="card" element-loading-background="rgba(248,250,252,0.6)">
                            <div class="card-header">
                                Wachtwoord resetten
                            </div>

                            <div class="card-body">
                                <el-alert v-if="appPasswordChanged" title="Uw wachtwoord is gewijzigd, u kunt nu inloggen in de app" type="success" show-icon/>

                                <div class="form-row">
                                    <div class="col-sm-12">
                                        <input-password name="password" placeholder="Wachtwoord" :model="model" :form="form"/>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="col-sm-12">
                                        <input-password name="password_confirmation" placeholder="Wachtwoord bevestigen" :model="model" :form="form"/>
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer has-buttons">
                                <el-button type="primary" native-type="submit">
                                    Wachtwoord resetten
                                </el-button>
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
                required: false,
                default: null,
            }
        },

        data() {
            return {
                action: null,
                loading: false,
                appPasswordChanged: false
            }
        },

        beforeRouteEnter(to, from, next) {
            axios.get(this.route('/users/password/:token', {token: to.params.token})).then(response => {
                next(vm => {
                    vm.action = response.data.data;
                });
            }).catch(error => {
                next(vm => {
                    vm.$router.replace({name: 'login'});

                    this.$message({
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
                    this.$oauth.addAuthHeaders();

                    this.$router.push('dashboard');

                    this.$message({
                        message: 'Uw wachtwoord is gewijzigd',
                        type: 'success'
                    });

                    Events.$emit('users:authenticated');
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
