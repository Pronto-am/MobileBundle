<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="form-row">
                <div class="col-sm-12">
                    <input-checkbox id="registrationEnabled" name="registrationEnabled" text="Registratie voor nieuwe gebruikers is toegestaan" :form="form" :model="model.config"/>
                </div>
            </div>

            <div class="form-row">
                <div class="col-sm-12">
                    <input-checkbox id="accountActivationViaEmail" name="accountActivationViaEmail" text="Activatie van gebruikersaccount via e-mail vereist" :form="form" :model="model.config"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from "./config";

    export default {
        mixins: [config],

        methods: {
            //
        }
    }
</script>
