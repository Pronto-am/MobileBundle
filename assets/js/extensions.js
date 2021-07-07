String.prototype.upperCaseFirst = function() {
    return this[0].toUpperCase() + this.slice(1);
};

Date.prototype.sameDay = function(date) {
    return this.getFullYear() === date.getFullYear()
        && this.getDate() === date.getDate()
        && this.getMonth() === date.getMonth();
}
