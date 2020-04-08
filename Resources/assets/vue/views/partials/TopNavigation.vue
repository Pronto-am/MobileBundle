<style scoped lang="scss">
    @import '../../../scss/mixins';

    div.template-header {
        display: flex;
        flex-direction: row;

        > div {
            height: var(--navbar-height);
            line-height: var(--navbar-height);

            &:nth-child(1) {
                flex: 0 0 var(--sidebar-width);
            }

            &:nth-child(2) {
                padding: 0 20px 0 50px;
            }

            &:nth-child(4) {
                padding-right: 50px;
                text-align: center;
            }

            @media (max-width: 575.98px) {
                &:nth-child(2) {
                    display: none;
                }

                &:nth-child(4) {
                    flex: auto;
                    text-align: right;
                    padding-right: 30px;
                }
            }
        }
    }
</style>

<template>
    <fixed-header :threshold="0">
        <div class="row no-gutters template-header">
            <div class="col-auto">
                <img src="/bundles/prontomobile/images/logo-login.png" height="65px">
            </div>

            <div class="col">
                <application-switcher></application-switcher>
            </div>

            <div class="col-auto">

            </div>

            <div class="col-auto">
                <locale-changer></locale-changer>
            </div>
        </div>
    </fixed-header>
</template>
