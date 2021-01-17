const moment = require('moment');

module.exports = {
    format: function(format) {
        return moment().format(format);
    },
    toDate: function(string) {
        return moment(string);
    }
};