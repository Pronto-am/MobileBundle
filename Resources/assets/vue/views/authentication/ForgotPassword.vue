<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <vue-form ref="form"
                          :url="$url('auth/password')"
                          :model="user"
                          @submit:success="success"
                          @submit:error="submitError">
                    <template slot-scope="{ form, model }">
                        <div v-loading="form.submitting" class="card" element-loading-background="rgba(248,250,252,0.6)">
                            <div class="card-header">
                                Wachtwoord vergeten
                            </div>

                            <div class="card-body">
                                <div class="form-row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <input-text name="email"
                                                        placeholder="E-mailadres"
                                                        :model="model"
                                                        :form="form"/>
                                        </div>
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
        data() {
            return {
                user: {},
                loading: false
            }
        },

        methods: {
            success() {
                this.$message({
                    message: 'U heeft een e-mail ontvangen om uw wachtwoord te resetten',
                    type: 'success'
                });

                this.$refs.form.reset();
            },
        }
    }
</script>
