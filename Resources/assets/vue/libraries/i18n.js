import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie';

// Translations
import baseEnglish from '../localization/en/base';
import messagesEnglish from '../localization/en/messages';
import menuEnglish from '../localization/en/menu';
import labelsEnglish from '../localization/en/labels';
import titlesEnglish from '../localization/en/titles';
import buttonsEnglish from '../localization/en/buttons';
import baseDutch from '../localization/nl/base';
import messagesDutch from '../localization/nl/messages';
import menuDutch from '../localization/nl/menu';
import labelsDutch from '../localization/nl/labels';
import titlesDutch from '../localization/nl/titles';
import buttonsDutch from '../localization/nl/buttons';

Vue.use(VueI18n);

const messages = {
    en: {
        default: baseEnglish,
        messages: messagesEnglish,
        menu: menuEnglish,
        labels: labelsEnglish,
        titles: titlesEnglish,
        buttons: buttonsEnglish,
    },
    nl: {
        default: baseDutch,
        messages: messagesDutch,
        menu: menuDutch,
        labels: labelsDutch,
        titles: titlesDutch,
        buttons: buttonsDutch,
    }
};

const defaultLanguage = Cookies.get('selected_locale');

export default new VueI18n({
    locale: defaultLanguage ? defaultLanguage : 'en',
    fallbackLocale: 'en',
    messages
});
