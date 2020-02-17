<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="form-row margin-bottom-md">
                <div class="col-sm-12">
                    <input-text name="firebaseAccessToken" label="Firebase access token" :form="form" :model="model.config"/>
                </div>
            </div>

            <div class="form-row">
                <div class="col-sm-12">
                    <b>Notificatie HTML template</b>
                </div>
            </div>

            <div class="row margin-bottom-md">
                <div class="col-sm-12">
                    <html-preview :content="content"></html-preview>
                </div>
            </div>

            <div class="form-row">
                <div class="col-sm-12">
                    <input-code name="notificationHtmlTemplate" language="html" :form="form" :model="model.config" @change="updateIframe"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from "./config";

    export default {
        mixins: [config],

        data() {
            return {
                content: this.model.config.notificationHtmlTemplate,
            }
        },

        methods: {
            updateIframe(code) {
                this.content = code;
            }
        }
    }
</script>
