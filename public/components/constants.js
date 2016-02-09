(function () {
    angular
        .module('schedulerApp')
        .constant('HOURS_INTERVAL', {
            from: 0,
            to: 12
        })
        .constant('HOUR_BLOCK_HEIGHT_PX', 25);
})();