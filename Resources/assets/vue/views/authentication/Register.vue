<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-if="user"
        class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4"
      >
        <vue-form
          :model="user"
          :url="$url('vue.register')"
          @submit:success="registrated"
          @submit:error="error"
        >
          <template slot-scope="{ form, model }">
            <div
              v-loading="form.submitting"
              class="card"
              element-loading-background="rgba(248,250,252,0.6)"
            >
              <div class="card-header">
                Registreren
              </div>

              <div class="card-body">
                <div class="row margin-bottom-sm">
                  <el-alert
                    v-if="activated"
                    title="Uw account is geactiveerd, u kunt nu inloggen in de app"
                    type="success"
                    :closable="false"
                  />
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <input-text
                      name="first_name"
                      label="Voornaam"
                      placeholder="Voornaam"
                      :model="model"
                      :form="form"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <input-text
                      name="last_name"
                      label="Achternaam"
                      placeholder="Achternaam"
                      :model="model"
                      :form="form"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <input-password
                      name="password"
                      label="Wachtwoord"
                      placeholder="Wachtwoord"
                      :model="model"
                      :form="form"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <input-password
                      name="password_confirmation"
                      label="Wachtwoord bevestigen"
                      placeholder="Wachtwoord bevestigen"
                      :model="model"
                      :form="form"
                    />
                  </div>
                </div>
              </div>

              <div class="card-footer has-buttons">
                <el-button
                  type="primary"
                  native-type="submit"
                >
                  Registreren
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
      required: true,
    }
  },

  beforeRouteEnter(to, from, next) {
    axios.get(`${to.params.token}`).then(({data: {data: user}}) => {
      next(vm => {
        vm.user = user;
      });
    }).catch(error => {
      next();
    })
  },

  data() {
    return {
      user: null,
      loading: false,
      activated: false
    }
  },

  methods: {

    registrated(response) {
      if (!response.access_token) {
        this.activated = true;
        this.user = {};

        return;
      }

      this.$oauth.storeSession(response);
      this.$oauth.addAuthHeaders();

      this.$router.replace({name: 'dashboard'});

      Events.$emit('users:authenticated');
    },

    error(error) {
      this.loading = false;
      this.user.password = null;
      this.user.password_confirmation = null;

      this.$message({
        message: 'Er is iets mis gegaan, probeer het opnieuw',
        type: 'error'
      });
    }
  }
}
</script>
