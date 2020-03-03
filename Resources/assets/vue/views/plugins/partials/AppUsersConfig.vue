<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="form-row">
                <div class="col-sm-12">
                    <input-checkbox id="registrationEnabled" name="registrationEnabled" :text="$t('labels.user_registration_enabled')" :form="form" :model="model.config"/>
                </div>
            </div>

            <div class="form-row">
                <div class="col-sm-12">
                    <input-checkbox id="accountActivationViaEmail" name="accountActivationViaEmail" :text="$t('labels.user_activation_required')" :form="form" :model="model.config"/>
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
