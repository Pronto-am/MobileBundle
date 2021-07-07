import Vue from 'vue';
import VueI18n from 'vue-i18n';
// Translations
import labelsEnglish from '../localization/en/labels';
import titlesEnglish from '../localization/en/titles';
import textEnglish from '../localization/en/text';
import labelsDutch from '../localization/nl/labels';
import titlesDutch from '../localization/nl/titles';
import textDutch from '../localization/nl/text';
// ElementUI
import enLocale from 'element-ui/lib/locale/lang/en'
import nlLocale from 'element-ui/lib/locale/lang/nl'

Vue.use(VueI18n);

const messages = {
    en: {
        labels: labelsEnglish,
        titles: titlesEnglish,
        text: textEnglish,
        ...enLocale
    },
    nl: {
        labels: labelsDutch,
        titles: titlesDutch,
        text: textDutch,
        ...nlLocale
    }
};

const numberFormats = {
    'nl': {
        currency: {
            style: 'currency',
            currency: 'EUR'
        }
    },
    'en': {
        currency: {
            style: 'currency',
            currency: 'EUR'
        }
    },
};

const defaultLanguage = window.vueConfig.locale;

export default new VueI18n({
    locale: defaultLanguage ? defaultLanguage : 'en',
    fallbackLocale: 'en',
    messages,
    numberFormats
});
