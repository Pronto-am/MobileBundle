<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    Card title
                </div>

                <div class="card-body"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //
            }
        },

        beforeRouteEnter(to, from, next) {
            next();
        }
    }
</script>
