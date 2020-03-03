<template>
    <el-dropdown trigger="click" @command="changeLocale">
        <span class="el-dropdown-link"><span v-html="$i18n.locale.toUpperCase()"></span><i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="locale of locales"
                              :key="locale"
                              :command="locale"
                              v-html="locale.toUpperCase()"></el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                locales: ['nl', 'en'],
            }
        },

        methods: {
            changeLocale(newLocale) {
                this.$i18n.locale = newLocale;
                Cookies.set('selected_locale', newLocale, {
                    expires: 365 * 24 * 60 * 60,
                });
            }
         }
    }
</script>
