<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <vue-form :url="path('users')"
                      :model="item"
                      @submit:success="saved"
                      @submit:error="submitError">

                <template slot-scope="{form, model}">
                    <div class="card" v-loading="form.submitting" element-loading-background="rgba(248,250,252,0.6)">
                        <div class="card-header">Gebruiker {{ id ? 'bewerken' : 'toevoegen' }}</div>

                        <div class="card-body">
                            <div class="form-row">
                                <div class="col-sm-8">
                                    <input-text name="first_name" :label="$t('labels.first_name')" :form="form" :model="model"/>
                                </div>

                                <div class="col-sm-4">
                                    <input-text name="insertion" :label="$t('labels.insertion')" :form="form" :model="model"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12 col-md-12 col-lg-6">
                                    <input-text name="last_name" :label="$t('labels.last_name')" :form="form" :model="model"/>
                                </div>

                                <div class="col-sm-12 col-md-12 col-lg-6">
                                    <input-text name="email" :label="$t('labels.email')" :form="form" :model="model"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="col-sm-12">
                                    <input-select name="role" :label="$t('labels.role')" :form="form" :model="model">
                                        <el-option :label="$t('labels.role_app_user')" value="ROLE_APP_USER"></el-option>
                                        <el-option :label="$t('labels.role_user')" value="ROLE_USER"></el-option>
                                        <el-option :label="$t('labels.role_admin')" value="ROLE_ADMIN"></el-option>
                                        <el-option :label="$t('labels.role_super_admin')" value="ROLE_SUPER_ADMIN"></el-option>
                                    </input-select>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer has-buttons">
                            <el-button type="primary" native-type="submit">{{ $t('buttons.save') }}</el-button>
                        </div>
                    </div>
                </template>
            </vue-form>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                required: false,
                default: null
            }
        },

        data() {
            return {
                item: null,
            }
        },

        beforeRouteEnter(to, from, next) {
            if(!to.params.id) {
                next(vm => vm.item = {});
                return;
            }
            
            axios.get(path('users/:id', {id: to.params.id})).then(({data: {data: user}}) => {
                next(vm => {
                    vm.item = user;

                    if (user.roles.includes('ROLE_SUPER_ADMIN')) {
                        vm.item.role = 'ROLE_SUPER_ADMIN';

                    } else if (user.roles.includes('ROLE_ADMIN')) {
                        vm.item.role = 'ROLE_ADMIN';

                    } else if (user.roles.includes('ROLE_APP_USER')) {
                        vm.item.role = 'ROLE_APP_USER';

                    } else {
                        vm.item.role = 'ROLE_USER';
                    }
                });
            }).catch(error => {
                next();
            });
        },

        methods: {
            saved({data: user}) {
                this.submitSuccess();

                if(!this.id) {
                    this.$router.replace({name: 'users.edit', params: {id: user.id}});
                }
            }
        }
    }
</script>
