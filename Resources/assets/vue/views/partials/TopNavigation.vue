<style scoped lang="scss">
    .row {
        .col-auto:first-of-type {
            width: var(--sidebar-width);
        }
    }
</style>

<template>
    <div class="template-header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-auto">
                    <img src="/bundles/prontomobile/images/logo-login.png" height="65px">
                </div>

                <div class="col"></div>

                <div class="col-auto center-content">
                    <locale-changer></locale-changer>
                </div>
            </div>
        </div>
    </div>
</template>
