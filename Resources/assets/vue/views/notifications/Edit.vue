<template>
    <div class="row">
        <div class="col-sm-12" v-if="item">
            <div class="card">
                <div class="card-header">Push notificatie {{ id ? 'bewerken' : 'toevoegen' }}</div>

                <push-notification-form :notification="item" :segments="segments" :test-devices="testDevices"></push-notification-form>
            </div>
        </div>
    </div>
</template>

<script>
    import editMixin from './mixins/edit-mixin';

    export default {
        mixins: [editMixin],
    }
</script>
