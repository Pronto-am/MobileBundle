import Vue from 'vue';

Vue.mixin({
    methods: {
        openTab(url) {
            let tab = window.open(url, '_blank');
            tab.focus();
        },
    }
});

Vue.filter('capitalize', function (value) {
    if (!value) {
        return '';
    }

    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('round', function (value) {
    return Math.round(value * 100) / 100;
});