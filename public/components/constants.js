(function () {
    angular
        .module('schedulerApp')
        .constant('AMOUNT_HOURS_IN_DAY', 12)
        .constant('HOURS_INTERVAL', {
            from: 0,
            to: 12
        })
        .constant('AMOUNT_DAYS_IN_WEEK', 7)
        .constant('HOUR_BLOCK_HEIGHT_PX', 25);
})();